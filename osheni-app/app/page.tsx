import Link from 'next/link';
import { LocaleToggle } from '@/components/LocaleToggle';
import { WaitlistForm } from '@/components/WaitlistForm';
import { copy, type Locale } from '@/lib/content';

export default function Page({ searchParams }: { searchParams?: { lang?: Locale } }) {
  const locale = searchParams?.lang === 'es' ? 'es' : 'en';
  const t = copy[locale];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t.brand}</p>
            <p className="text-sm text-slate-600">{t.tagline}</p>
          </div>
          <LocaleToggle />
        </header>

        <section className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="badge">iOS • Android • Bilingual</span>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-text md:text-6xl">{t.heroTitle}</h1>
            <p className="max-w-2xl text-lg text-slate-600">{t.heroSubtitle}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#waitlist" className="btn-primary">{t.cta}</a>
              <Link href="/app/home" className="btn-secondary">Open MVP Prototype</Link>
            </div>
          </div>

          <div className="card overflow-hidden p-4">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 text-white">
              <p className="text-sm uppercase tracking-[0.2em]">Today’s flow</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/15 p-4">Welcome → Language → Sign Up → 14-Day Trial</div>
                <div className="rounded-2xl bg-white/15 p-4">Home → Meditation → Journal → Mood Check-In</div>
                <div className="rounded-2xl bg-white/15 p-4">Trial End → Plan Selection → Billing</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {t.features.map((feature) => (
            <div key={feature.title} className="card p-6">
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="mt-2 text-slate-600">{feature.body}</p>
            </div>
          ))}
        </section>

        <section className="py-14">
          <h2 className="text-2xl font-semibold">{t.pricingTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {t.pricing.map((item) => (
              <div key={item} className="card p-6 text-center font-medium">{item}</div>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-semibold">What people should feel</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {t.testimonials.map((quote) => (
              <blockquote key={quote} className="card p-6 text-slate-700">{quote}</blockquote>
            ))}
          </div>
        </section>

        <section id="waitlist" className="grid gap-8 py-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-semibold">{t.waitlistTitle}</h2>
            <p className="mt-3 max-w-xl text-slate-600">Prelaunch landing page and email capture are in place. The next production step is wiring this form to Supabase, Mailchimp, ConvertKit, or another email platform.</p>
          </div>
          <WaitlistForm labels={t.form} />
        </section>
      </div>
    </div>
  );
}
