import { AppShell } from '@/components/AppShell';

export default function ProfilePage() {
  return (
    <AppShell title="Profile & Settings">
      <section className="card p-5">
        <p className="text-sm text-slate-500">Member since April 2026</p>
        <h2 className="text-xl font-semibold">Christopher</h2>
        <p className="mt-2 text-slate-600">Current plan: Free Trial</p>
      </section>

      <section className="space-y-3">
        {[
          'Edit Profile',
          'Subscription & Billing',
          'Notifications',
          'Language',
          'Privacy Settings',
          'Help & Support',
          'Terms & Privacy Policy',
          'Log Out'
        ].map((item) => (
          <div key={item} className="card p-4 font-medium">{item}</div>
        ))}
      </section>
    </AppShell>
  );
}
