"use client";

import { updateOrderStatus } from "@/app/admin/actions";

const STATUSES = ["pending", "processing", "paid", "fulfilled"];

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <select
      defaultValue={status}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        e.stopPropagation();
        updateOrderStatus(id, e.target.value);
      }}
      className="rounded-lg border border-neutral-300 px-2 py-1 text-sm capitalize focus:border-primary focus:outline-none"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
