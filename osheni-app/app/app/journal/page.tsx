import { AppShell } from '@/components/AppShell';
import { journalPrompts } from '@/lib/content';

export default function JournalPage() {
  return (
    <AppShell title="Your Journal">
      <section className="card p-5">
        <p className="text-sm text-slate-500">Today’s Prompt</p>
        <h2 className="mt-2 text-xl font-semibold">{journalPrompts[0]}</h2>
        <button className="btn-primary mt-4 w-full">Start Writing</button>
      </section>

      <section className="card p-5">
        <p className="text-sm text-slate-500">New Entry</p>
        <textarea className="mt-3 min-h-48 w-full rounded-xl border border-slate-200 p-4" placeholder="Write freely. Your journal is private." />
        <div className="mt-4 flex gap-2 flex-wrap">
          {['😊 Great', '🙂 Good', '😐 Okay', '😔 Not Great', '😢 Struggling'].map((mood) => (
            <span key={mood} className="badge">{mood}</span>
          ))}
        </div>
        <button className="btn-primary mt-4 w-full">Save Entry</button>
      </section>
    </AppShell>
  );
}
