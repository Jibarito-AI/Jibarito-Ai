import { Text } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

const faqs = [
  'How do I join a live session?',
  'How do I cancel my subscription?',
  'Why can’t I hear the meditation audio?',
  'How do I change my language?',
  'Is my journal private?',
  'How do I delete my account?'
];

export default function HelpScreen() {
  return (
    <AppScreen title="Help & Support">
      {faqs.map((faq) => (
        <Card key={faq}>
          <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{faq}</Text>
        </Card>
      ))}
      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Contact</Text>
        <Text style={{ color: theme.colors.text }}>Email: contacto@osheni.com</Text>
        <Text style={{ color: theme.colors.text }}>WhatsApp: 1-209-604-3646</Text>
      </Card>
    </AppScreen>
  );
}
