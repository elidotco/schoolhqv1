import { createClient } from "@/lib/supabase/server";

async function getSchoolId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.user_metadata?.school_id;
}
// Get all classes in a school
export async function GET(req: Request) {
  try {
    const schoolId = await getSchoolId();
    if (!schoolId) {
      return new Response(JSON.stringify({ error: "School ID not found" }), {
        status: 404,
      });
    }
    const supabase = await createClient();
    //  Get All classes in a schoool
    const { data: classes, error } = await supabase
      .from("classes")
      .select(
        `
        *
      `,
      )
      .eq("school_id", schoolId)
      .order("name", { ascending: true });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ classes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching school ID:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// Create a new class in a school
export async function POST(req: Request) {
  try {
    const schoolId = await getSchoolId();
    if (!schoolId) {
      return new Response(JSON.stringify({ error: "School ID not found" }), {
        status: 404,
      });
    }
    const data = await req.json();
    const supabase = await createClient();

    const { data: newClass, error } = await supabase
      .from("classes")
      .insert({
        name: data.name,
        school_id: schoolId,
      })
      .select("*")
      .single();
    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching school ID:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
