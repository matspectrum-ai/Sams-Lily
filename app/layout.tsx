import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css'; // Global styles

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: "Sams and Mat",
  description: "An interactive, elegant, procedurally blooming flower visualizer set in a star-twinkling dark night garden.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: "Lírio Mágico",
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0312',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cormorant.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
