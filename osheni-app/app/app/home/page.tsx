import { AppShell } from '@/components/AppShell';
import { liveSessions, quickMeditations } from '@/lib/content';

export default function HomePage() {
  return (
    <AppShell title="Home Dashboard">
      <section className="card p-5">
        <p className="text-sm text-slate-500">Good morning, Christopher</p>
        <h2 className="mt-1 text-2xl font-semibold">12 day streak 🔥</h2>
        <p className="mt-2 text-slate-600">“Peace comes from what you practice daily.”</p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {['Journal Entry', 'Mood Check-In', 'Quick Meditation', 'Breathing Exercise'].map((item) => (
          <div key={item} className="card p-4 text-sm font-medium">{item}</div>
        ))}
      </section>

      <section className="card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Upcoming Live Session</p>
            <h3 className="text-lg font-semibold">Afternoon Recharge</h3>
          </div>
          <span className="badge">In 2 hours</span>
        </div>
        <button className="btn-primary mt-4 w-full">Join Session</button>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold">Recommended For You</h3>
        <div className="space-y-3">
          {quickMeditations.map((meditation) => (
            <div key={meditation.title} className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{meditation.title}</p>
                  <p className="text-sm text-slate-500">{meditation.category}</p>
                </div>
                <span className="badge">{meditation.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold">Today’s Live Sessions</h3>
        <div className="space-y-3">
          {liveSessions.map((session) => (
            <div key={session.time} className="card p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{session.name}</p>
                  <p className="text-sm text-slate-500">{session.time} • {session.attendees} attending</p>
                </div>
                <span className="badge">{session.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
