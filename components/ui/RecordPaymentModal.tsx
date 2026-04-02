"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { X, Search, Check } from "lucide-react";

export function RecordPaymentModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-white rounded-xl shadow-2xl z-50 overflow-hidden outline-none">
          {/* Header */}
          <div className="p-8 pb-0 flex justify-between items-start">
            <div>
              <Dialog.Title className="text-2xl font-bold text-zinc-900">
                Record Payment
              </Dialog.Title>
              <Dialog.Description className="text-zinc-500 text-sm mt-1">
                Enter the transaction details to update the student ledger.
              </Dialog.Description>
            </div>
            <Dialog.Close className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <X size={20} className="text-zinc-400" />
            </Dialog.Close>
          </div>

          <form className="p-8 space-y-8">
            {/* Student Search */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Student Search
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by name or student ID..."
                  className="w-full h-14 pl-12 pr-4 bg-zinc-50 border border-zinc-100 rounded-lg focus:ring-2 focus:ring-black/5 outline-none transition-all"
                />
              </div>
            </div>

            {/* Applicable Fees (Grid) */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Applicable Fees
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Tuition Fee", "Facility Fee", "Bus Service", "PTA Dues"].map(
                  (fee) => (
                    <label
                      key={fee}
                      className="flex items-center gap-3 p-4 border border-zinc-100 rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors"
                    >
                      <Checkbox.Root className="w-5 h-5 bg-white border-2 border-zinc-200 rounded flex items-center justify-center data-[state=checked]:bg-black data-[state=checked]:border-black transition-all">
                        <Checkbox.Indicator>
                          <Check
                            size={14}
                            className="text-white"
                            strokeWidth={4}
                          />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <span className="text-sm font-semibold text-zinc-700">
                        {fee}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* Payment Amount */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Payment Amount
              </label>
              <div className="relative flex items-center group">
                <span className="absolute left-5 text-[10px] font-bold text-zinc-400">
                  GHC
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full h-20 pl-16 pr-6 text-4xl font-bold bg-zinc-50 border border-zinc-100 rounded-lg focus:bg-white focus:border-zinc-200 outline-none transition-all placeholder:text-zinc-200"
                />
              </div>
            </div>

            {/* Payment Method (Segmented Control) */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Payment Method
              </label>
              <RadioGroup.Root
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="flex p-1 bg-zinc-100 rounded-lg"
              >
                {["CASH", "MOBILE MONEY", "BANK TRANSFER"].map((method) => (
                  <RadioGroup.Item
                    key={method}
                    value={method.toLowerCase()}
                    className="flex-1 py-3 text-[10px] font-black tracking-widest rounded-md transition-all data-[state=checked]:bg-white data-[state=checked]:shadow-sm data-[state=unchecked]:text-zinc-400"
                  >
                    {method}
                  </RadioGroup.Item>
                ))}
              </RadioGroup.Root>
            </div>

            {/* Optional Notes */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Optional Notes
              </label>
              <textarea
                placeholder="Any additional information..."
                className="w-full p-4 min-h-[100px] bg-zinc-50 border border-zinc-100 rounded-lg focus:ring-2 focus:ring-black/5 outline-none transition-all resize-none"
              />
            </div>

            <button className="w-full h-16 bg-[#18181b] text-white text-sm font-black tracking-[0.2em] uppercase rounded-lg hover:bg-black transition-colors">
              Record Payment
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
