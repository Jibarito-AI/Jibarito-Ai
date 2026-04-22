'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function LocaleToggle() {
  const router = useRouter();
  const params = useSearchParams();
  const locale = (params.get('lang') ?? 'en') as 'en' | 'es';

  const setLocale = (lang: 'en' | 'es') => {
    const next = new URLSearchParams(params.toString());
    next.set('lang', lang);
    router.push(`?${next.toString()}`);
  };

  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-soft">
      {(['en', 'es'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={`rounded-full px-3 py-1 text-sm font-medium ${locale === lang ? 'bg-primary text-white' : 'text-text'}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
