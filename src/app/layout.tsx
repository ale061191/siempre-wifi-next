import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../index.css';
import '../App.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import StyleGuideHandler from './StyleGuideHandler';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Siempre WiFi - Internet Global',
  description: 'Internet 4G LTE ilimitado en ms de 160 pases sin cambiar de SIM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <StyleGuideHandler>
          <div className="App">
            <Navbar />
            {children}
            <Footer />
            <Chatbot />
          </div>
        </StyleGuideHandler>
      </body>
    </html>
  );
}
