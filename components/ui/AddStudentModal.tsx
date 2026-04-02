"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as Separator from "@radix-ui/react-separator";
import { X, ChevronDown, Check } from "lucide-react";

export function AddStudentModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />

        {/* Content */}
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-[700px] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <Dialog.Title className="text-3xl font-bold text-black">
              Add Student
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-1.5 hover:bg-slate-100 transition-colors">
              <X className="h-5 w-5 text-slate-500" />
            </Dialog.Close>
          </div>

          <form
            className="p-10 space-y-10"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* --- Student Info Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kwesi"
                  className="w-full h-12 px-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mensah"
                  className="w-full h-12 px-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Student ID
                </label>
                <input
                  type="text"
                  placeholder="SS-2024-XXX"
                  className="w-full h-12 px-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full h-12 px-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>

              {/* Radix Select: Gender */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Gender
                </label>
                <CustomSelect
                  placeholder="Select gender"
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                />
              </div>

              {/* Radix Select: Class */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Class
                </label>
                <CustomSelect
                  placeholder="Assign class"
                  options={[
                    { label: "Primary 1", value: "p1" },
                    { label: "Primary 2", value: "p2" },
                  ]}
                />
              </div>
            </div>

            {/* --- Guardian Section --- */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Separator.Root className="bg-slate-200 h-[1px] flex-1" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  Guardian Information
                </span>
                <Separator.Root className="bg-slate-200 h-[1px] flex-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full h-12 px-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Guardian Phone
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                      GHC
                    </span>
                    <input
                      type="text"
                      placeholder="024 000 0000"
                      className="w-full h-12 px-4 rounded-r-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Guardian Email
                  </label>
                  <div className="relative flex">
                    {/* <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                      GHC
                    </span> */}
                    <input
                      type="email"
                      placeholder="guardian@example.com"
                      className="w-full h-12 px-4 rounded-r-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-black text-white font-bold rounded-lg uppercase tracking-widest hover:bg-zinc-800 transition-colors mt-4"
            >
              Save Student
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Reusable Radix Select internal component
function CustomSelect({
  placeholder,
  options,
}: {
  placeholder: string;
  options: { label: string; value: string }[];
}) {
  return (
    <Select.Root>
      <Select.Trigger className="inline-flex h-12 w-full items-center justify-between rounded-md border border-slate-200 px-4 text-slate-500 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow-xl border border-slate-100 z-[60]">
          <Select.Viewport className="p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="relative flex h-10 select-none items-center rounded-sm pl-8 pr-4 text-sm font-medium text-slate-700 data-[highlighted]:bg-slate-100 data-[highlighted]:outline-none cursor-pointer"
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center justify-center text-black">
                  <Check size={14} strokeWidth={3} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
