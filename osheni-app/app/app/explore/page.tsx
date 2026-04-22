import { AppShell } from '@/components/AppShell';
import { quickMeditations } from '@/lib/content';

export default function ExplorePage() {
  return (
    <AppShell title="Explore">
      <div className="card p-4">
        <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Search meditations" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'Sleep', 'Stress', 'Gratitude', 'Anxiety', 'Breathwork', 'Mindfulness'].map((chip) => (
          <span key={chip} className="badge whitespace-nowrap">{chip}</span>
        ))}
      </div>
      <section className="space-y-3">
        {quickMeditations.concat(quickMeditations).map((meditation, index) => (
          <div key={`${meditation.title}-${index}`} className="card p-4">
            <p className="font-semibold">{meditation.title}</p>
            <p className="text-sm text-slate-500">{meditation.category} • {meditation.duration}</p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
