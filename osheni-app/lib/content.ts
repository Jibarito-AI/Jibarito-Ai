export type Locale = 'en' | 'es';

export const copy = {
  en: {
    brand: 'OSHENI',
    tagline: 'Your daily sanctuary for inner peace',
    heroTitle: 'Your Daily Sanctuary for Inner Peace',
    heroSubtitle:
      'Join thousands finding balance through guided meditation, mindful journaling, and a supportive community. Your wellness journey starts here.',
    cta: 'Join the Waitlist - Get 14 Days Free',
    features: [
      { title: 'Daily Live Sessions', body: 'Four guided sessions each day designed around real schedules and real-life stress.' },
      { title: 'Meditation Library', body: 'On-demand meditations for sleep, calm, stress, gratitude, and mindfulness.' },
      { title: 'Private Journal', body: 'Daily prompts, autosave journaling, and mood tracking in a private space.' },
      { title: 'Bilingual Support', body: 'Full experience in English and Spanish from day one.' }
    ],
    testimonials: [
      '“Osheni changed my life. I finally have tools to manage my anxiety.”',
      '“The combination of live sessions and the app makes it easy to stay consistent.”',
      '“The journaling helped me process emotions I did not even know I was carrying.”'
    ],
    pricingTitle: 'Affordable Wellness for Everyone',
    pricing: ['Monthly Plan: $9.99/month', 'Annual Plan: $89/year', '14-Day Free Trial - No Credit Card Required'],
    waitlistTitle: 'Get Early Access',
    form: { firstName: 'First Name', email: 'Email Address', language: 'Preferred Language', submit: 'Get Early Access' }
  },
  es: {
    brand: 'OSHENI',
    tagline: 'Tu santuario diario para la paz interior',
    heroTitle: 'Tu Santuario Diario para la Paz Interior',
    heroSubtitle:
      'Únete a miles de personas que encuentran balance mediante meditaciones guiadas, journaling consciente y una comunidad de apoyo. Tu camino de bienestar comienza aquí.',
    cta: 'Únete a la lista de espera - 14 días gratis',
    features: [
      { title: 'Sesiones en vivo diarias', body: 'Cuatro sesiones guiadas cada día diseñadas para horarios reales y estrés real.' },
      { title: 'Biblioteca de meditaciones', body: 'Meditaciones a demanda para sueño, calma, estrés, gratitud y mindfulness.' },
      { title: 'Diario privado', body: 'Prompts diarios, auto guardado y seguimiento de estado de ánimo en un espacio privado.' },
      { title: 'Soporte bilingüe', body: 'Experiencia completa en inglés y español desde el primer día.' }
    ],
    testimonials: [
      '“Osheni cambió mi vida. Finalmente tengo herramientas para manejar mi ansiedad.”',
      '“La combinación de sesiones en vivo y la app hace fácil mantener la constancia.”',
      '“El journaling me ayudó a procesar emociones que ni sabía que cargaba.”'
    ],
    pricingTitle: 'Bienestar accesible para todos',
    pricing: ['Plan mensual: $9.99/mes', 'Plan anual: $89/año', 'Prueba gratis de 14 días - Sin tarjeta'],
    waitlistTitle: 'Obtén acceso temprano',
    form: { firstName: 'Nombre', email: 'Correo electrónico', language: 'Idioma preferido', submit: 'Obtener acceso temprano' }
  }
} as const;

export const quickMeditations = [
  { title: 'Morning Reset', duration: '5 min', category: 'Stress' },
  { title: 'Deep Sleep Wind Down', duration: '12 min', category: 'Sleep' },
  { title: 'Breath Into Calm', duration: '8 min', category: 'Breathwork' }
];

export const liveSessions = [
  { time: '6:00 AM', name: 'Morning Practice', status: 'Upcoming', attendees: 124 },
  { time: '11:00 AM', name: 'Midday Reset', status: 'Upcoming', attendees: 97 },
  { time: '4:00 PM', name: 'Afternoon Recharge', status: 'Live Now', attendees: 156 },
  { time: '9:00 PM', name: 'Evening Wind-Down', status: 'Upcoming', attendees: 203 }
];

export const journalPrompts = [
  'What do I need to release today?',
  'Where did I find peace today?',
  'What emotion needs my attention right now?'
];
