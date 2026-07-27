"use client";

import { deleteOrder } from "@/app/admin/actions";

export default function DeleteOrderButton({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (confirm("Delete this order? This can't be undone.")) deleteOrder(id);
      }}
      className="text-sm text-red-600 underline"
    >
      Delete
    </button>
  );
}
