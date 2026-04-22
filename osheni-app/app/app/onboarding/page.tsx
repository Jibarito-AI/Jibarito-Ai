import Link from 'next/link';

const steps = [
  'Splash Screen',
  'Welcome Carousel',
  'Language Selection',
  'Sign Up',
  'Trial Start',
  'Notification Permission',
  'Goals',
  'Experience Level',
  'Session Time Preferences'
];

export default function OnboardingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-between bg-gradient-to-b from-sky-50 to-white p-6">
      <div>
        <span className="badge">Onboarding Flow</span>
        <h1 className="mt-4 text-3xl font-bold">Welcome to Osheni</h1>
        <p className="mt-3 text-slate-600">This page condenses the onboarding sequence from the wireframes into a developer-friendly prototype.</p>
        <div className="mt-6 space-y-3">
          {steps.map((step, index) => (
            <div key={step} className="card flex items-center justify-between p-4">
              <span>{index + 1}. {step}</span>
              <span className="text-slate-400">→</span>
            </div>
          ))}
        </div>
      </div>
      <Link href="/app/home" className="btn-primary mt-8 text-center">Start Your Journey</Link>
    </div>
  );
}
