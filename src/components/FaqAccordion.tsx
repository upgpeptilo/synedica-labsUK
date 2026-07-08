"use client";

import { useState } from "react";

type Faq = { q: string; a: string };

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold hover:bg-neutral-50 ${open ? "text-primary" : "text-text-heading"}`}
            >
              {faq.q}
              <span className="text-xl leading-none">{open ? "−" : "+"}</span>
            </button>
            {open && <div className="bg-neutral-50 px-5 py-4 text-sm text-text-body">{faq.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
