import React from "react";
import { MoreVertical, ChevronRight } from "lucide-react";

interface Payment {
  receiptNo: string;
  studentName: string;
  avatarUrl: string;
  grade: string;
  amount: number;
  method: "MOBILE MONEY" | "BANK TRANSFER" | "CASH";
  date: string;
}

const RecentPayments = ({ payments }: { payments: Payment[] }) => {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">Recent Payments</h2>
        <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
          View all records <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Receipt No.
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Student
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Class
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Amount
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Method
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Date
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payments.map((payment) => (
              <tr
                key={payment.receiptNo}
                className="hover:bg-gray-50/80 transition-colors group"
              >
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                  {payment.receiptNo}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* <img
                      src={payment.avatarUrl}
                      alt={payment.studentName}
                      className="w-8 h-8 rounded-full object-cover bg-gray-100"
                    /> */}
                    <span className="text-sm font-bold text-gray-900">
                      {payment.studentName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Grade {payment.grade}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  GH₵{" "}
                  {payment.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-[10px] font-bold rounded-full border ${getMethodStyles(payment.method)}`}
                  >
                    {payment.method}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {payment.date}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-300 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper for conditional styling
const getMethodStyles = (method: string) => {
  switch (method) {
    case "MOBILE MONEY":
      return "bg-amber-50 text-amber-700 border-amber-100";
    case "BANK TRANSFER":
      return "bg-blue-50 text-blue-700 border-blue-100";
    case "CASH":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    default:
      return "bg-gray-50 text-gray-700 border-gray-100";
  }
};

export default RecentPayments;
