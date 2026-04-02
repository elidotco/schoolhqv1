"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Switch from "@radix-ui/react-switch";
import { X, CheckCircle2, MessageSquareText } from "lucide-react";

export function SendRemainderModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [target, setTarget] = useState("all");
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white rounded-xl shadow-2xl z-50 overflow-hidden outline-none">
          {/* Header */}
          <div className="p-6 flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Communication Console
              </p>
              <Dialog.Title className="text-2xl font-bold text-zinc-900 leading-tight">
                Send Fee Reminders
              </Dialog.Title>
            </div>
            <Dialog.Close className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <X size={20} className="text-zinc-400" />
            </Dialog.Close>
          </div>

          <form
            className="p-6 pt-2 space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Target Recipients */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Target Recipients
              </label>
              <RadioGroup.Root
                value={target}
                onValueChange={setTarget}
                className="grid grid-cols-2 gap-3"
              >
                {/* All Students Option */}
                <RadioGroup.Item
                  value="all"
                  className="relative flex flex-col items-start p-4 text-left border-2 rounded-xl transition-all data-[state=checked]:border-black data-[state=unchecked]:border-zinc-100 group"
                >
                  <span className="text-sm font-bold text-zinc-800">
                    All Students
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-1">
                    With outstanding balance
                  </span>
                  <RadioGroup.Indicator className="absolute top-3 right-3">
                    <CheckCircle2
                      size={18}
                      className="text-black"
                      fill="currentColor"
                      fillOpacity={0.1}
                    />
                  </RadioGroup.Indicator>
                </RadioGroup.Item>

                {/* Specific Class Option */}
                <RadioGroup.Item
                  value="class"
                  className="relative flex flex-col items-start p-4 text-left border-2 rounded-xl transition-all data-[state=checked]:border-black data-[state=unchecked]:border-zinc-100 group"
                >
                  <span className="text-sm font-bold text-zinc-400 group-data-[state=checked]:text-zinc-800">
                    Specific Class
                  </span>
                  <span className="text-[11px] text-zinc-300 mt-1">
                    Choose manual selection
                  </span>
                </RadioGroup.Item>
              </RadioGroup.Root>
            </div>

            {/* Message Preview */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Message Preview
              </label>
              <div className="relative p-6 bg-zinc-50 rounded-xl border-l-4 border-zinc-900">
                <p className="text-sm leading-relaxed text-zinc-600 font-medium italic">
                  Dear Parent, this is a reminder regarding the outstanding fees
                  of GHC [Balance] for [Student Name]. Please settle before the
                  weekend. Thank you.
                </p>
                {/* Visual cursor indicator from design */}
                <span className="absolute bottom-10 right-40 w-2 h-2 rounded-full border-2 border-pink-400" />
              </div>
            </div>

            {/* SMS Broadcast Toggle */}
            <div className="flex items-center justify-between p-5 bg-zinc-50 rounded-xl border border-zinc-100">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg border border-zinc-100 shadow-sm text-zinc-600">
                  <MessageSquareText size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-800">
                    Enable SMS Broadcast
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    Additional GHC 0.05 per message
                  </p>
                </div>
              </div>
              <Switch.Root
                checked={smsEnabled}
                onCheckedChange={setSmsEnabled}
                className="w-11 h-6 bg-zinc-200 rounded-full relative data-[state=checked]:bg-zinc-900 transition-colors outline-none cursor-pointer"
              >
                <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-6" />
              </Switch.Root>
            </div>

            {/* Submit Action */}
            <div className="space-y-4 pt-2">
              <button className="w-full h-14 bg-[#18181b] text-white text-xs font-black tracking-[0.2em] uppercase rounded-lg hover:bg-black transition-colors">
                Send Reminders
              </button>
              <p className="text-center text-[11px] text-zinc-400 font-medium">
                Estimated reach:{" "}
                <span className="font-bold text-zinc-600">84 Recipients</span>
              </p>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
