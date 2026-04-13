"use client";

import StudentTable from "@/components/ui/StudentTable";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const StudentPage = () => {
  // Fetch students from the database and pass them to the StudentTable component

  const { data } = useSWR("/api/students", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
    refreshInterval: 120000,
  });

  console.log("Students data:", data);
  // use Swr to fetch students from the API route

  return (
    <section>
      <StudentTable students={data?.data || []} />
    </section>
  );
};

export default StudentPage;
