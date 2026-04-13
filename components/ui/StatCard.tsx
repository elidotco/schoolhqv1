import React from "react";
import {
  Users,
  Wallet,
  ClipboardList,
  CircleDashed,
  TrendingUp,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string | null;
  isAlert?: boolean;
  loading?: number;
}

const StatCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  isAlert,
  loading,
}: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-w-[240px] flex-1">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
        {title}
      </h3>
      <Icon className="text-gray-400 w-6 h-6" />
    </div>

    <div className="space-y-1">
      <p
        className={`text-4xl font-bold tracking-tight ${isAlert ? "text-red-700" : "text-gray-800"}`}
      >
        {value}
      </p>

      {trend && (
        <div className="flex items-center gap-1 text-emerald-500 text-sm font-bold">
          <TrendingUp size={16} />
          <span>{trend}</span>
        </div>
      )}

      {subtext && (
        <p className="text-gray-400 text-sm font-medium">{subtext}</p>
      )}

      {loading && (
        <div className="w-full bg-gray-200 border h-2 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-black h-full rounded-full"
            style={{ width: `${loading}%` }}
          ></div>
        </div>
      )}
    </div>
  </div>
);

interface DashboardHeaderProps {
  data: {
    totalStudents?: number;
    growth?: number;
    feesCollected?: number;
    totalOutstanding?: number;
    overdueStudents?: number;
    collectionRate?: number;
  };
}

const DashboardHeader = ({ data }: DashboardHeaderProps) => {
  const stats = [
    {
      title: "Total Students",
      value: data?.totalStudents || "N/A",
      trend: data?.growth ? `${data.growth}%` : null,
      icon: Users,
    },
    {
      title: "Fees Collected",
      value: "GH₵ " + (data?.feesCollected || "N/A"),
      subtext: "This month",
      icon: Wallet,
    },
    {
      title: "Outstanding",
      value: "GH₵ " + (data?.totalOutstanding || "N/A"),
      subtext: `${data?.overdueStudents || 0} students overdue`,
      icon: ClipboardList,
      isAlert: true,
    },
    {
      title: "Collection Rate",
      value: "" + (data?.collectionRate ? `${data.collectionRate}%` : "N/A"),
      icon: CircleDashed,
      loading: data?.collectionRate,
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-6 bg-gray-50">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardHeader;
