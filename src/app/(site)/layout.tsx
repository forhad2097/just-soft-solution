import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { AnimatedBackground } from "@/components/animated-bg";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnimatedBackground />
      <Header />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
