'use client';

import { FormEvent, useState } from 'react';

export function WaitlistForm({ labels }: { labels: { firstName: string; email: string; language: string; submit: string } }) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      <input required placeholder={labels.firstName} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary" />
      <input required type="email" placeholder={labels.email} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary" />
      <select className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary" defaultValue="en">
        <option value="en">{labels.language}: English</option>
        <option value="es">{labels.language}: Español</option>
      </select>
      <button className="btn-primary w-full" type="submit">{labels.submit}</button>
      {submitted ? <p className="text-sm text-green-700">Thanks — your waitlist capture is wired and ready to connect to a backend.</p> : null}
    </form>
  );
}
