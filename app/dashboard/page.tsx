import AcaOverview from "@/components/ui/AcaOverview";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

function TransactionSkeleton() {
  return <ul>...</ul>;
}
async function SchoolInfo() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const schoolId = user?.user_metadata?.school_id;

  const { data: school } = await supabase
    .from("schools")
    .select("*")
    .eq("id", schoolId)
    .single();

  if (!school) {
    return (
      <>
        <p>Set UP your school information</p>
      </>
    );
  }

  return <h1>{school?.name}</h1>;
}
export default async function DashBoard() {
  return (
    <Suspense fallback={<TransactionSkeleton />}>
      {/* Aca Overview */}
      <AcaOverview />

      <SchoolInfo />
    </Suspense>
  );
}
