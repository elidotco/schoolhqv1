import {
  Plus,
  SlidersHorizontal,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const FeeManagement = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9] p-8 ">
      {/* Header Section */}
      <header className="flex justify-between items-start mb-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
            Finance & Operations
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Fee Management
          </h1>
          <p className="text-gray-500 max-w-md leading-relaxed">
            Design and govern the financial architecture of the current academic
            year. Create structures that scale with your curriculum.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition-all">
          <Plus className="w-4 h-4" /> Create Fee Structure
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <button className="pb-4 text-sm font-bold border-b-2 border-black">
          Fee Structures
        </button>
        <button className="pb-4 text-sm font-bold text-gray-300 hover:text-gray-500 transition-colors">
          Assignments
        </button>
      </div>

      {/* Hero Cards Section */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        {/* Status Card */}
        <div className="col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">
            Current Structure Status
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Academic Year 2023/2024
          </h2>
          <p className="text-gray-400 text-sm mb-10">
            12 active structures currently applied to 450 students across all
            departments.
          </p>

          <div className="flex gap-16">
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-[10px] font-bold uppercase text-gray-400">
                Total Structures
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">GH₵ 1.2M</p>
              <p className="text-[10px] font-bold uppercase text-gray-400">
                Projected Revenue
              </p>
            </div>
          </div>
        </div>

        {/* Integrity Card */}
        <div className="bg-black text-white p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <ShieldCheck className="w-8 h-8 text-gray-600 mb-4" />
          <div>
            <h3 className="text-lg font-bold mb-2">
              Financial Integrity
              <br />
              Guaranteed.
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              All structures are audited against the national education
              framework automatically.
            </p>
          </div>
          {/* Subtle background decoration could go here */}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-50">
          <h3 className="font-bold text-gray-700">All Structures</h3>
          <div className="flex gap-4 text-gray-400">
            <SlidersHorizontal className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <Download className="w-5 h-5 cursor-pointer hover:text-gray-600" />
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-gray-50/30">
              <th className="px-8 py-4">Structure Name</th>
              <th className="px-4 py-4">Type</th>
              <th className="px-4 py-4">Amount GHC</th>
              <th className="px-4 py-4">Term</th>
              <th className="px-4 py-4">Year</th>
              <th className="px-4 py-4">Class</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {feeData.map((fee, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-5">
                  <p className="text-sm font-bold text-gray-800">{fee.name}</p>
                  <p className="text-[10px] text-gray-400">{fee.description}</p>
                </td>
                <td className="px-4 py-5">
                  <span className="px-2 py-0.5 rounded bg-gray-100 text-[9px] font-black text-gray-500 uppercase">
                    {fee.type}
                  </span>
                </td>
                <td className="px-4 py-5 text-sm font-bold text-gray-700">
                  {fee.amount}
                </td>
                <td className="px-4 py-5 text-sm text-gray-500">{fee.term}</td>
                <td className="px-4 py-5 text-sm text-gray-500">{fee.year}</td>
                <td className="px-4 py-5 text-sm text-gray-500">{fee.class}</td>
                <td className="px-8 py-5 text-right">
                  <MoreHorizontal className="w-5 h-5 text-gray-300 inline cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-6 flex justify-between items-center bg-gray-50/20">
          <p className="text-[10px] font-bold text-gray-400 uppercase">
            Showing 5 of 12 structures
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-300 hover:text-gray-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded bg-black text-white text-xs font-bold">
              1
            </button>
            <button className="w-8 h-8 rounded hover:bg-gray-200 text-xs font-bold text-gray-600">
              2
            </button>
            <button className="p-2 text-gray-300 hover:text-gray-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const feeData = [
  {
    name: "Senior Secondary Tuition",
    description: "General Arts & Science",
    type: "Tuition",
    amount: "2,450.00",
    term: "First Term",
    year: "2023/24",
    class: "SHS 1-3",
  },
  {
    name: "Infrastructure Levy",
    description: "Annual Development Fund",
    type: "Levy",
    amount: "500.00",
    term: "Annual",
    year: "2023/24",
    class: "All Classes",
  },
  {
    name: "Lab & Practical Fees",
    description: "Science Department Only",
    type: "Tuition",
    amount: "320.00",
    term: "Second Term",
    year: "2023/24",
    class: "SHS 2-3",
  },
  {
    name: "PTA Contribution",
    description: "Mandatory Association Fee",
    type: "Levy",
    amount: "150.00",
    term: "Annual",
    year: "2023/24",
    class: "All Classes",
  },
  {
    name: "Library Endowment",
    description: "Resource Acquisition",
    type: "Resource",
    amount: "75.00",
    term: "First Term",
    year: "2023/24",
    class: "All Classes",
  },
];

export default FeeManagement;
