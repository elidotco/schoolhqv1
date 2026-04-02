import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Helper function to get the current user's school ID and role
async function getSchoolAndUser(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("school_id, role")
    .eq("id", user.id)
    .single();
  if (!profile?.school_id) return null;
  return { user_id: user.id, school_id: profile.school_id, role: profile.role };
}

// GEnerates a unique student code based on the number of students in the school and a prefix defined in the school settings
async function generateStudentCode(school_id: string) {
  const supabase = await createClient();

  // Get settings for prefix
  const { data: settings } = await supabase
    .from("school_settings")
    .select("student_id_prefix")
    .eq("school_id", school_id)
    .single();

  const prefix = settings?.student_id_prefix || "STU";

  // Count existing students to generate next number
  const { count } = await supabase
    .from("students")
    .select("*", { count: "exact", head: true })
    .eq("school_id", school_id);

  const next = String((count || 0) + 1).padStart(4, "0");
  return `${prefix}-${next}`;
}

export async function GET(request: NextRequest) {
  try {
    const auth = await getSchoolAndUser(request);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const class_id = searchParams.get("class_id") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const supabase = await createClient();

    let query = supabase
      .from("students")
      .select(
        `
        *,
        class:classes(id, name, level),
        fee_assignments(status)
      `,
        { count: "exact" },
      )
      .eq("school_id", auth.school_id)
      .eq("is_active", true)
      .order("first_name", { ascending: true })
      .range(from, to);

    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,student_code.ilike.%${search}%`,
      );
    }

    if (class_id) {
      query = query.eq("class_id", class_id);
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    });
  } catch (error) {
    console.error("Students GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getSchoolAndUser(request);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Auto-generate student code if not provided
    const student_code =
      body.data.student_code || (await generateStudentCode(auth.school_id));

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("students")
      .insert({
        ...body.data,
        student_code,
        school_id: auth.school_id,
      })
      .select(`*, class:classes(id, name, level)`)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Students POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
