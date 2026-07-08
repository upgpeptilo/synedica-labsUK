export default function AlertBanner({
  title,
  body,
  subtext,
}: {
  title: string;
  body: string;
  subtext?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-teal px-6 py-6 text-center text-black shadow-md">
      <h2 className="font-heading text-lg font-bold text-red-900 sm:text-xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed sm:text-base">{body}</p>
      {subtext && <p className="mt-2 text-xs text-black/70">{subtext}</p>}
    </div>
  );
}
