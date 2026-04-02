"use client";

import React from "react";
import { Button } from "./button";
import { AddStudentModal } from "./AddStudentModal";
import { RecordPaymentModal } from "./RecordPaymentModal";
import { SendRemainderModal } from "./SendRemainderModal";

const AcaOverview = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSendRemainderModalOpen, setIsSendRemainderModalOpen] =
    React.useState(false);
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] =
    React.useState(false);

  return (
    <div className="flex w-full  justify-between">
      <div className="flex flex-col">
        <h1 className="text-4xl">Academic Overview</h1>
        <p className="text-muted-foreground">
          Term 2, 2023/2024 Academic Session
        </p>
      </div>
      <SendRemainderModal
        open={isSendRemainderModalOpen}
        onOpenChange={setIsSendRemainderModalOpen}
      />
      <RecordPaymentModal
        open={isRecordPaymentModalOpen}
        onOpenChange={setIsRecordPaymentModalOpen}
      />

      <AddStudentModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          Add Student
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsSendRemainderModalOpen(true)}
        >
          Send Remainder
        </Button>
        <Button onClick={() => setIsRecordPaymentModalOpen(true)}>
          Record Payment
        </Button>
      </div>
    </div>
  );
};

export default AcaOverview;
