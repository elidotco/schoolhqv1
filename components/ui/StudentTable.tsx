"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

type Status = "paid" | "partial" | "outstanding";

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  student_code: string;
  class: {
    name: string;
  };
  guardian_name: string;
  guardian_phone: string;
  phone: string;
  status: Status;
  fee_assignments: {
    status: Status;
  }[];
}

const StudentTable = ({ students }: { students: Student[] }) => {
  const [activeTab, setActiveTab] = useState("All Students");
  const tabs = ["All Students", "Class JHS 1", "Class JHS 2", "Class JHS 3"];
  // Filter logic based on tab selection
  const filteredStudents = students.filter(
    (student) =>
      activeTab === "All Students" ||
      student.class.name === activeTab.replace("Class ", ""),
  );
  console.log(filteredStudents);
  return (
    <div className="w-full   rounded-lg">
      {/* Navigation Tabs */}
      <div className="flex p-6 bg-white items-center justify-between border-b border-gray-100 ">
        <div className="flex   gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-semibold transition-all relative ${
                activeTab === tab
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700">
          <Filter className="w-4 h-4" /> More Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="p-6 px-10">
            <tr className="text-[14px] font-bold bg-muted text-gray-400 uppercase py-10 px-6 tracking-widest border-b border-gray-50">
              <th className="pb-6 pt-6 px-6">Student Name</th>
              <th className="pb-6  pt-6 px-2">Student ID</th>
              <th className="pb-6  pt-6 px-2">Class</th>
              <th className="pb-6  pt-6 px-2">Guardian</th>
              <th className="pb-6  pt-6 px-2">Phone</th>
              <th className="pb-6  pt-6 px-2 text-center">Status</th>
              <th className="pb-6  pt-6 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white  divide-gray-50">
            {filteredStudents.map((student) => (
              <tr
                key={student.student_code}
                className="group hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200">
                      {student.first_name[0]}
                      {student.last_name[0]}
                    </div>
                    <span className="text-sm font-bold text-gray-800 leading-tight whitespace-pre-line w-24">
                      {student.first_name} {student.last_name}
                    </span>
                  </div>
                </td>
                <td className="py-5 px-6 text-sm text-gray-500 font-medium">
                  {student.student_code}
                </td>
                <td className="py-5 px-6 text-sm text-gray-500">
                  {student.class.name}
                </td>
                <td className="py-5 px-6 text-sm text-gray-500">
                  {student.guardian_name}
                </td>
                <td className="py-5 pl-6 text-sm text-gray-500 font-medium leading-relaxed">
                  {student.guardian_phone}
                </td>
                <td className="py-5 px-6 text-center">
                  <span
                    className={`px-3 py-1 text-[10px] font-bold rounded-full ${getStatusStyles(student.fee_assignments[0].status)}`}
                  >
                    {student.fee_assignments[0].status}
                  </span>
                </td>
                <td className="py-5 px-6 text-right">
                  <div className="flex flex-col text-[11px] font-bold text-gray-400 uppercase">
                    <button className="hover:text-gray-900 transition-colors">
                      View
                    </button>
                    <button className="hover:text-gray-900 transition-colors">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper for Initials
const getInitials = (name: string) =>
  name
    .split("")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

// Helper for Status UI
const getStatusStyles = (status: Status) => {
  switch (status) {
    case "paid":
      return "bg-gray-100 text-gray-800";
    case "partial":
      return "bg-gray-100 text-gray-500";
    case "outstanding":
      return "bg-gray-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-400";
  }
};

export default StudentTable;
