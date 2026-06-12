import type {Metadata} from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css'; // Global styles

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: "Sam's Lil Flower",
  description: "An interactive, elegant, procedurally blooming flower visualizer set in a star-twinkling dark night garden.",
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
