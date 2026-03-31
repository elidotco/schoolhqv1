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
export default async function ProtectedPage() {
  return (
    <Suspense fallback={<TransactionSkeleton />}>
      <div className="flex-1 w-full flex flex-col gap-12">
        Hello this is the dashboard
      </div>

      <SchoolInfo />
    </Suspense>
  );
}
