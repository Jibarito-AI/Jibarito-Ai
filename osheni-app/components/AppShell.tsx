import Link from 'next/link';

const nav = [
  { href: '/app/home', label: 'Home' },
  { href: '/app/explore', label: 'Explore' },
  { href: '/app/sessions', label: 'Sessions' },
  { href: '/app/journal', label: 'Journal' },
  { href: '/app/profile', label: 'Profile' }
];

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Osheni App</p>
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <span className="badge">14-Day Trial</span>
        </div>
      </header>
      <main className="space-y-4 px-4 py-5 pb-24">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-md justify-around border-t border-slate-200 bg-white px-2 py-3">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
