import { createClient } from "@/lib/supabase/server";
import { signUpvalidation } from "@/lib/validations";

export async function POST(req: Request, res: Response) {
  const data = await req.json();

  // validate data here
  const validatedData = signUpvalidation.safeParse(data);
  if (!validatedData.success) {
    return new Response(
      JSON.stringify({ error: "Invalid data", details: validatedData.error }),
      { status: 400 },
    );
  }

  try {
    const supabase = await createClient();

    // create ShoolHQ user in Supabase
    const { error, data } = await supabase.auth.signUp({
      email: validatedData.data.email,
      password: validatedData.data.password,
      options: {
        emailRedirectTo: `http://localhost:3000/auth/callback`,
        data: {
          first_name: validatedData.data.firstName,
          last_name: validatedData.data.lastName,
        },
      },
    });
    console.log("Supabase signUp response:", { error, data });
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }
    // update the profiles table with the user's first and last name
    // const { error: updateError } = await supabase
    //   .from("profiles")
    //   .update({
    //     first_name: validatedData.data.firstName,
    //     last_name: validatedData.data.lastName,
    //   })
    //   .eq("id", data.user?.id);
    // if (updateError) {
    //   console.error("Error updating user profile:", updateError);
    //   return new Response(JSON.stringify({ error: updateError.message }), {
    //     status: 400,
    //   });
    // }
  } finally {
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
