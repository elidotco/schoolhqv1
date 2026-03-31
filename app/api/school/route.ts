// User can only have one school, so we can use the session to get the school_id and pass it to the API route
// This is a simple route to get the school data for the logged in user
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  // the user passes the school id from their profile, we use that to get the school data and return it

  const { schoolId } = await req.json();
  const supabase = await createClient();
  const user = await supabase.auth.getClaims();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const { data: school, error } = await supabase
    .from("schools")
    .select("*")
    .eq("id", schoolId)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ school }), {
    status: 200,
  });
}
