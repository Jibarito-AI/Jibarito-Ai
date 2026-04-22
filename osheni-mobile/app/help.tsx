import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

const faqs = [
  {
    question: 'How do I join a live session?',
    answer: 'Go to the Sessions screen from the Home dashboard. Tap any upcoming session to see details and join. You will need an active subscription to attend live sessions.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'Go to Profile → Subscription & Billing. You can manage or cancel your subscription there. Cancellations take effect at the end of your billing period.',
  },
  {
    question: "Why can't I hear the meditation audio?",
    answer: 'Make sure your phone volume is turned up and your device is not on silent mode. If the issue persists, close the app and reopen it.',
  },
  {
    question: 'How do I change my language?',
    answer: 'Go to Profile & Settings and tap the EN or ES button to switch between English and Spanish. Tap Save Profile to apply the change.',
  },
  {
    question: 'Is my journal private?',
    answer: 'Yes. Your journal entries are private and only visible to you. They are stored securely and never shared with anyone.',
  },
  {
    question: 'How do I delete my account?',
    answer: 'To delete your account, email us at contacto@osheni.com with the subject "Delete Account." We will process your request within 5 business days.',
  },
];

export default function HelpScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AppScreen title="Help & Support">
      <Text style={{ color: theme.colors.muted, paddingHorizontal: 4, marginBottom: 4 }}>
        Tap a question to see the answer.
      </Text>

      <View style={{ gap: theme.spacing.sm }}>
        {faqs.map((faq, index) => (
          <Pressable
            key={faq.question}
            onPress={() => toggle(index)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#f0f0f0' : theme.colors.white,
              borderRadius: theme.radius.md,
              padding: theme.spacing.md,
              borderWidth: 1,
              borderColor: openIndex === index ? theme.colors.primary : theme.colors.border,
            })}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: theme.colors.text, fontWeight: '600', flex: 1, marginRight: 8 }}>
                {faq.question}
              </Text>
              <Text style={{ color: theme.colors.primary, fontSize: 18, fontWeight: '700' }}>
                {openIndex === index ? '−' : '+'}
              </Text>
            </View>
            {openIndex === index && (
              <Text style={{ color: theme.colors.muted, marginTop: 10, lineHeight: 22 }}>
                {faq.answer}
              </Text>
            )}
          </Pressable>
        ))}
      </View>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, marginBottom: 4 }}>Still need help?</Text>
        <Text style={{ color: theme.colors.muted }}>Email: contacto@osheni.com</Text>
        <Text style={{ color: theme.colors.muted }}>WhatsApp: 1-209-604-3646</Text>
      </Card>
    </AppScreen>
  );
}
