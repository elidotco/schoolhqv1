import { createClient } from "@/lib/supabase/server";
import { onBoardingvalidation } from "@/lib/validations";

export async function POST(req: Request) {
  console.log(">>> API ROUTE HIT: /api/onboarding"); // First check

  try {
    const data = await req.json();
    console.log(">>> REQUEST BODY:", data);

    const supabase = await createClient();

    // 1. Auth Check
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    console.log(">>> AUTH STATUS:", { userId: user?.id, authError });

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // 2. Validation Check (Fixed the syntax error here)
    const validatedData = onBoardingvalidation.safeParse(data);
    if (!validatedData.success) {
      console.log(">>> ZOD ERROR:", validatedData.error.format()); // See exactly what's wrong
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: validatedData.error.flatten(),
        }),
        { status: 400 },
      );
    }

    console.log(">>> DATA VALIDATED. INSERTING SCHOOL...");

    // 3. School Insert
    const { data: newSchool, error: schoolError } = await supabase
      .from("schools")
      .insert({
        name: validatedData.data.schoolName,
        address: validatedData.data.schoolAddress,
        phone: validatedData.data.schoolPhone,
        email: validatedData.data.schoolEmail,
        region: validatedData.data.schoolRegion,
      })
      .select("id")
      .single();

    if (schoolError) {
      console.error(">>> DB INSERT ERROR:", schoolError);
      return new Response(JSON.stringify({ error: schoolError.message }), {
        status: 400,
      });
    }

    console.log(">>> SCHOOL CREATED:", newSchool.id);

    //  instead of updating the profile add onboarding complete to the user options data
    const { error: metadataError } = await supabase.auth.updateUser({
      data: { school_id: newSchool.id },
    });

    // 4. Profile Update
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ school_id: newSchool.id })
      .eq("id", user.id);

    if (updateError) {
      console.error(">>> PROFILE UPDATE ERROR:", updateError);
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    console.error(">>> CRITICAL SERVER ERROR:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500 },
    );
  }
}
