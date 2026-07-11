export const metadata = { title: "Privacy Policy – Synedica UK" };

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-neutral-700">
      <h1 className="font-heading text-3xl font-bold text-dark">Privacy Policy</h1>

      <p className="mt-6 font-semibold text-dark">Privacy Policy for Synedica UK</p>
      <p className="font-semibold text-dark">Last Updated: June 4, 2026</p>

      <p className="mt-6">
        At Synedica (accessible from [Insert Domain]), the privacy and security of our researchers
        and clients are our highest priorities. This Privacy Policy outlines the types of
        information we collect and how we use and protect it in compliance with UK data protection
        laws (GDPR).
      </p>

      <h2 className="mt-8 font-heading text-lg font-bold text-dark">1. Information We Collect</h2>
      <p className="mt-2">
        When you visit our website, register an account, or place a laboratory order, we may
        collect:
      </p>
      <ul className="mt-4 list-disc space-y-3 pl-5">
        <li>
          <span className="font-semibold text-dark">Personal Identification Information:</span>{" "}
          Name, billing address, shipping address, email address, and phone number.
        </li>
        <li>
          <span className="font-semibold text-dark">Payment Information:</span> Credit card
          details or other payment data. (Please note: payments are processed securely via
          encrypted third-party payment gateways; Synedica does not store your full financial
          details on our servers).
        </li>
        <li>
          <span className="font-semibold text-dark">Usage Data:</span> IP address, browser type,
          device information, and website navigation paths, collected via cookies to improve your
          user experience.
        </li>
      </ul>

      <h2 className="mt-8 font-heading text-lg font-bold text-dark">2. How We Use Your Information</h2>
      <p className="mt-2">We use the collected data strictly to:</p>
      <ul className="mt-4 list-disc space-y-3 pl-5">
        <li>Process, fulfill, and securely ship your laboratory research orders.</li>
        <li>Communicate with you regarding order updates, tracking information, and customer support.</li>
        <li>Send occasional promotional emails or inventory updates (you may opt out or unsubscribe at any time).</li>
        <li>Improve website functionality and protect against fraudulent transactions.</li>
      </ul>

      <h2 className="mt-8 font-heading text-lg font-bold text-dark">3. Sharing Your Information</h2>
      <p className="mt-2">
        We deeply respect your privacy. We <span className="font-semibold text-dark">do not</span>{" "}
        sell, trade, or rent your personal information to third parties. We only share necessary
        data with trusted third-party service providers (such as shipping couriers and secure
        payment processors) strictly for the purpose of fulfilling your order and operating our
        business securely.
      </p>

      <h2 className="mt-8 font-heading text-lg font-bold text-dark">4. Your Data Protection Rights (GDPR)</h2>
      <p className="mt-2">If you are a resident of the UK or European Economic Area (EEA), you have the right to:</p>
      <ul className="mt-4 list-disc space-y-3 pl-5">
        <li>Access the personal data we hold about you.</li>
        <li>Request corrections to any inaccurate data.</li>
        <li>Request the deletion of your personal data (&ldquo;Right to be Forgotten&rdquo;).</li>
        <li>Opt-out of direct marketing communications at any time.</li>
      </ul>

      <h2 className="mt-8 font-heading text-lg font-bold text-dark">5. Contact Us</h2>
      <p className="mt-2">
        If you wish to exercise any of your data protection rights, or if you have questions
        regarding this Privacy Policy, please contact our Data Protection team at:{" "}
        <span className="font-semibold text-dark">[Insert Email]</span>.
      </p>
    </div>
  );
}
