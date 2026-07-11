"use client";

import { useState } from "react";
import { COUNTRIES, US_STATES } from "@/lib/geo";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none";

export default function AddressFields({
  idPrefix,
  fieldPrefix,
  defaultCountry = "United Kingdom",
}: {
  idPrefix: string;
  fieldPrefix: string;
  defaultCountry?: string;
}) {
  const [country, setCountry] = useState(defaultCountry);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-neutral-700" htmlFor={`${idPrefix}-firstName`}>
            First name *
          </label>
          <input id={`${idPrefix}-firstName`} name={`${fieldPrefix}FirstName`} type="text" required className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700" htmlFor={`${idPrefix}-lastName`}>
            Last name *
          </label>
          <input id={`${idPrefix}-lastName`} name={`${fieldPrefix}LastName`} type="text" required className={inputClass} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700" htmlFor={`${idPrefix}-country`}>
          Country / Region *
        </label>
        <select
          id={`${idPrefix}-country`}
          name={`${fieldPrefix}Country`}
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={inputClass}
        >
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700" htmlFor={`${idPrefix}-street1`}>
          Street address *
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            id={`${idPrefix}-street1`}
            name={`${fieldPrefix}Street1`}
            type="text"
            required
            placeholder="House number and street name"
            className={inputClass}
          />
          <input
            name={`${fieldPrefix}Street2`}
            type="text"
            placeholder="Apartment, suite, unit, etc. (optional)"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700" htmlFor={`${idPrefix}-city`}>
          Town / City *
        </label>
        <input id={`${idPrefix}-city`} name={`${fieldPrefix}City`} type="text" required className={inputClass} />
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700" htmlFor={`${idPrefix}-state`}>
          {country === "United States" ? "State *" : "State / County"}
        </label>
        {country === "United States" ? (
          <select id={`${idPrefix}-state`} name={`${fieldPrefix}State`} required className={inputClass}>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        ) : (
          <input id={`${idPrefix}-state`} name={`${fieldPrefix}State`} type="text" className={inputClass} />
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700" htmlFor={`${idPrefix}-zip`}>
          ZIP Code *
        </label>
        <input id={`${idPrefix}-zip`} name={`${fieldPrefix}Zip`} type="text" required className={inputClass} />
      </div>
    </div>
  );
}
