"use client";

import AcaOverview from "@/components/ui/AcaOverview";
import PaymentTable from "@/components/ui/PaymentTable";
import DashboardHeader from "@/components/ui/StatCard";
import { fetcher } from "@/lib/utils";
import { Skeleton } from "boneyard-js/react";
import useSWR from "swr";
import "../../bones/registry";

export default function DashBoard() {
  const { data, isLoading } = useSWR("/api/dashboard", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
    refreshInterval: 120000,
  });

  const stats = data?.data;

  // Define your skeleton fixture/mock data
  const skeletonFixture = {
    totalStudents: 234,
    feesCollected: 234,
    totalOutstanding: 134,
    overdueStudents: 324,
    collectionRate: 234,
  };

  return (
    <div className="space-y-6">
      {/* Aca Overview */}
      <AcaOverview />
      {/* FIX 1: Pass the isLoading variable to the loading prop.
         FIX 2: Ensure the children handle the "undefined" stats gracefully 
      */}

      <Skeleton
        loading={isLoading}
        name="dashboard"
        fixture={<DashboardHeader data={skeletonFixture} />}
      >
        <DashboardHeader data={stats || skeletonFixture} />
      </Skeleton>

      {/* Recent Transactions */}
      {/* If isLoading is true, you might want a separate skeleton for the table */}
      <Skeleton loading={isLoading} name="payment-table">
        <PaymentTable payments={stats?.recentPayments || []} />
      </Skeleton>
    </div>
  );
}
