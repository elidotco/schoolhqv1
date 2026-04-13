import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    //   get the current user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.log("No user session found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("school_id")
      .eq("id", user.id)
      .single();

    if (!profile?.school_id) {
      console.log("User has no associated school_id");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const school_id = profile.school_id;

    // Single query to materialized view — very fast
    const [statsResult, recentPaymentsResult] = await Promise.all([
      supabase
        .from("school_dashboard_stats")
        .select("*")
        .eq("school_id", school_id)
        .single(),

      supabase
        .from("receipts")
        .select(
          `
    receipt_number,
    issued_at,
    student:students(
      first_name,
      last_name,
      class:classes(name)
    ),
    payment:payments(
      amount,
      payment_method
    )
  `,
        )
        .eq("school_id", school_id)
        .order("issued_at", { ascending: false })
        .limit(5),
    ]);

    const stats = statsResult.data;

    // Format recent payments to match the Payment interface
    const recentPayments = (recentPaymentsResult.data || []).map((r: any) => ({
      receiptNo: r.receipt_number,
      studentName: `${r.student?.first_name} ${r.student?.last_name}`,
      avatarUrl: "",
      grade: r.student?.class?.name || "—",
      amount: r.payment?.amount || 0,
      method:
        r.payment?.payment_method === "mobile_money"
          ? "MOBILE MONEY"
          : r.payment?.payment_method === "bank_transfer"
            ? "BANK TRANSFER"
            : "CASH",
      // get only the date part of the issued_at timestamp
      date: r.issued_at
        ? new Date(r.issued_at).toISOString().split("T")[0]
        : "",
    }));

    const growth =
      stats?.students_last_month > 0
        ? Math.round(
            ((stats.students_this_month - stats.students_last_month) /
              stats.students_last_month) *
              100,
          )
        : 0;

    const response = NextResponse.json({
      data: {
        totalStudents: stats?.total_students || 0,
        growth,
        feesCollected: stats?.fees_collected_this_month || 0,
        totalOutstanding: stats?.total_outstanding || 0,
        overdueStudents: stats?.overdue_students || 0,
        collectionRate: stats?.collection_rate || 0,
        lastRefreshed: stats?.last_refreshed_at,
        recentPayments: recentPayments,
      },
    });

    // Cache for 60 seconds on the edge
    response.headers.set(
      "Cache-Control",
      "private, max-age=60, stale-while-revalidate=30",
    );

    return response;
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
