import type { Metadata } from 'next';
import './globals.css';
import { Six_Caps, Poppins } from 'next/font/google';

const sixCaps = Six_Caps({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--six-caps',
});
const popins = Poppins({
  subsets: ['latin'],
  variable: '--poppins',
  weight: ['100', '200', '400'],
});

export const metadata: Metadata = {
  title: 'OPLUS | PROJECTS',
  description: 'OPLUS | PROJECTS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${sixCaps.variable} ${popins.variable}  antialiased`}
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
