import { createClient } from "@/lib/supabase/server";
import { partialProfileSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();

    // 1. Validate only the fields present in the request
    const result = partialProfileSchema.safeParse(body);

    if (!result.success) {
      return new Response(JSON.stringify(result.error.message), {
        status: 400,
      });
    }

    // 2. Map validated fields to DB columns
    // We create an object and only add what exists in 'result.data'
    const updatePayload: any = {};
    if (result.data.firstName) updatePayload.first_name = result.data.firstName;
    if (result.data.lastName) updatePayload.last_name = result.data.lastName;
    if (result.data.avatarUrl !== undefined)
      updatePayload.avatar_url = result.data.avatarUrl;
    if (result.data.schoolId) updatePayload.school_id = result.data.schoolId;

    // 3. Update Database
    const { error: dbError } = await supabase
      .from("profiles")
      .update(updatePayload)
      .eq("id", user.id);

    if (dbError) return new Response(dbError.message, { status: 400 });

    // 4. Performance: Sync Metadata if schoolId changed
    // This keeps your Middleware 2.9s latency fix working!
    if (result.data.schoolId) {
      await supabase.auth.updateUser({
        data: { school_id: result.data.schoolId },
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
