import { getWhatsappNumber } from "@/lib/settings";
import { updateSiteSettings } from "../../actions";

export const metadata = { title: "Settings – Admin" };

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const whatsappNumber = await getWhatsappNumber();

  return (
    <div className="max-w-md">
      <h1 className="font-heading text-xl font-bold text-dark">Settings</h1>

      {saved && (
        <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
          Saved.
        </p>
      )}

      <form action={updateSiteSettings} className="mt-6 space-y-1.5">
        <label className="text-sm font-medium text-neutral-700" htmlFor="whatsappNumber">
          WhatsApp Number
        </label>
        <input
          id="whatsappNumber"
          name="whatsappNumber"
          type="tel"
          required
          defaultValue={whatsappNumber}
          placeholder="e.g. 447882524986"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none"
        />
        <p className="text-xs text-neutral-500">
          Digits only, with country code, no + or spaces (e.g. 447882524986). Anything else you paste in will be
          stripped down to digits automatically when you save.
        </p>
        <button
          type="submit"
          className="mt-4 rounded bg-dark px-5 py-2.5 font-semibold text-white hover:bg-neutral-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}
