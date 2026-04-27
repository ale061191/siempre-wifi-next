import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'flag-icons/css/flag-icons.min.css';
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
