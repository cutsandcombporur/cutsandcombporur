import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import BackToTop from '../common/BackToTop';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}

export default Layout;
