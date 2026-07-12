import { reviews } from "@/lib/reviews";

export default function ReviewsMarquee() {
  const items = [...reviews, ...reviews];

  return (
    <section className="overflow-hidden bg-section-alt py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-heading text-lg font-bold text-text-heading">What Our Customers Say</h2>
        <div className="mt-2 border-t border-neutral-300" />
      </div>

      <div className="mt-8 flex w-max gap-4 px-4 animate-marquee-ltr hover:[animation-play-state:paused]">
        {items.map((r, i) => (
          <div
            key={`${r.name}-${i}`}
            className="w-72 shrink-0 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-neutral-700">&ldquo;{r.text}&rdquo;</p>
            <p className="mt-3 text-sm font-semibold text-neutral-900">
              {r.name} <span className="font-normal text-neutral-500">({r.country})</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
