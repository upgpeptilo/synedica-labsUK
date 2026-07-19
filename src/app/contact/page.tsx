export const metadata = { title: "Contact – Synedica UK" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-3xl font-bold text-primary-dark">Contact</h1>
      <p className="mt-2 text-neutral-600">
        Fill in the form below or email office@synedicalabs-uk.com, a member of the team will be in
        touch shortly.
      </p>

      <form className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded border border-neutral-300 bg-white px-3 py-2 text-neutral-900"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border border-neutral-300 bg-white px-3 py-2 text-neutral-900"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="phone">
            Contact Number (Optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 w-full rounded border border-neutral-300 bg-white px-3 py-2 text-neutral-900"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded border border-neutral-300 bg-white px-3 py-2 text-neutral-900"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
        >
          Send
        </button>
      </form>
    </div>
  );
}
