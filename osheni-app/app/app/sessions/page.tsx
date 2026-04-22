import { AppShell } from '@/components/AppShell';
import { liveSessions } from '@/lib/content';

export default function SessionsPage() {
  return (
    <AppShell title="Live Sessions">
      {liveSessions.map((session) => (
        <section key={session.time} className="card p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">{session.time}</p>
              <h2 className="text-lg font-semibold">{session.name}</h2>
              <p className="text-sm text-slate-500">{session.attendees} attending</p>
            </div>
            <span className="badge">{session.status}</span>
          </div>
          <button className="btn-primary mt-4 w-full">{session.status === 'Live Now' ? 'Join Now' : 'Set Reminder'}</button>
        </section>
      ))}
    </AppShell>
  );
}
