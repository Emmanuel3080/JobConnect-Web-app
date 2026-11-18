import React, { useState } from "react";
import { Calendar } from "lucide-react";
import NativeModal from "../../NativeModal";
import { fieldClass, primaryButton } from "../../../utils/recruiterStyles";

const DEFAULT_FORM = { date: "", time: "10:00", notes: "Technical & role alignment interview" };

const SchedulerForm = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="interview-date" className="block text-xs font-semibold text-[#14243A] mb-1">
            Interview Date *
          </label>
          <input
            id="interview-date"
            type="date"
            required
            value={form.date}
            onChange={update("date")}
            className={`${fieldClass} w-full font-mono-tabular`}
          />
        </div>
        <div>
          <label htmlFor="interview-time" className="block text-xs font-semibold text-[#14243A] mb-1">
            Time *
          </label>
          <input
            id="interview-time"
            type="time"
            required
            value={form.time}
            onChange={update("time")}
            className={`${fieldClass} w-full font-mono-tabular`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="interview-notes" className="block text-xs font-semibold text-[#14243A] mb-1">
          Interview Details & Notes
        </label>
        <textarea
          id="interview-notes"
          rows={3}
          value={form.notes}
          onChange={update("notes")}
          className={`${fieldClass} w-full resize-none`}
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5DED2]">
        <button
          type="button"
          onClick={onCancel}
          className="px-3.5 py-2 rounded-lg text-xs font-semibold text-[#526174] hover:text-[#14243A] cursor-pointer"
        >
          Cancel
        </button>
        <button type="submit" className={primaryButton}>
          <Calendar className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
          <span>Confirm & Send Invite</span>
        </button>
      </div>
    </form>
  );
};

/**
 * Modal for booking an interview. The form remounts on every open so it
 * always starts from the defaults.
 */
const InterviewScheduler = ({ isOpen, candidate, jobTitle, onClose, onSubmit }) => (
  <NativeModal
    isOpen={isOpen}
    onClose={onClose}
    title={`Schedule Interview — ${candidate?.candidateName || ""}`}
    subtitle={jobTitle || ""}
    maxWidth="max-w-md"
  >
    {isOpen && <SchedulerForm onSubmit={onSubmit} onCancel={onClose} />}
  </NativeModal>
);

export default InterviewScheduler;
