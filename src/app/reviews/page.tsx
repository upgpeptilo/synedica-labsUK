import { reviews } from "@/lib/reviews";

export const metadata = { title: "Reviews – Synedica UK" };

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold text-primary-dark">Customer Reviews</h1>
      <p className="mt-2 text-neutral-600">What our customers across the UK and Europe say.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.name} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-neutral-700">&ldquo;{r.text}&rdquo;</p>
            <p className="mt-3 text-sm font-semibold text-neutral-900">
              {r.name} <span className="font-normal text-neutral-500">({r.country})</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
