import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const sixCaps = localFont({
  src: './fonts/SixCaps.ttf',
  variable: '--six-caps',
  weight: '100 900',
});

const popins = localFont({
  src: './fonts/Poppins.ttf',
  variable: '--poppins',
  weight: '100 900',
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
    <html lang="en">
      <body className={`${sixCaps.variable} ${popins.variable}  antialiased`}>
        {children}
      </body>
    </html>
  );
}
