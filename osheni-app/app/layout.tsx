import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Osheni',
  description: 'Wellness app starter built from Osheni wireframes and launch copy.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
