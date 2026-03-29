import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Phone, Mail, MessageCircle, Plus, Minus } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import HeroAnimation from '@/components/HeroAnimation';

/**
 * DTL Customs - Premium Autóüveg-fóliázás Landing Page
 * Design Philosophy: Premium Automotive Studio Minimalism
 * - Negative space as luxury
 * - Cinematic realism
 * - Restrained ice blue accent color
 * - Editorial typography (Sora + Inter)
 * - Smooth, purposeful motion
 */

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sticky nav background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const benefits = [
    { title: 'UV- és hővédelem', description: 'Csökkent hőterhelés és UV sugárzás' },
    { title: 'Fényvédelem', description: 'Csökkentett zavaró fény az utastérben' },
    { title: 'Privátabb utastér', description: 'Diszkrétebb megjelenés és belső védelem' },
    { title: 'Gyors kapcsolat', description: 'Messengeren, telefonon vagy emailen' },
  ];

  const services = [
    {
      title: 'Hő- és UV-védelem',
      description: 'Prémium fólia technológia, amely csökkenti a nyári hőterhelést és megvédi az utasteret az UV sugárzástól.',
    },
    {
      title: 'Fénycsökkentés',
      description: 'Elegáns árnyékolás, amely csökkenti a zavaró fényt és javítja a vezetési kényelmet.',
    },
    {
      title: 'Privátabb utastér',
      description: 'Diszkrét megjelenés, amely megvédi az utasteret és javítja az autó esztétikáját.',
    },
    {
      title: 'Letisztult, prémium megjelenés',
      description: 'Profi kivitelezés, amely az autó értékét és stílusát emeli.',
    },
  ];

  const process = [
    { step: '1', title: 'Kapcsolatfelvétel', description: 'Messengeren, telefonon vagy emailen' },
    { step: '2', title: 'Egyeztetés és időpont', description: 'Személyre szabott konzultáció' },
    { step: '3', title: 'Kivitelezés', description: 'Profi munka, prémium anyagok' },
  ];

  const faqItems = [
    {
      question: 'Mennyire sötét fóliát érdemes választani?',
      answer: 'A fólia sötétsége személyes preferencia kérdése. Ajánlott a könnyű vagy közepes árnyékolás, amely jó egyensúlyt teremt a privátság és a láthatóság között. Konzultálunk az Ön igényei szerint.',
    },
    {
      question: 'Miben segít a hő- és UV-védelem?',
      answer: 'A prémium fólia csökkenti a nyári hőterhelést, megvédi az utasteret az UV sugárzástól, és javítja az autó belsejének hosszú élettartamát.',
    },
    {
      question: 'Mennyi ideig tart az egyeztetés és a kivitelezés?',
      answer: 'Az egyeztetés általában 15-20 percet vesz igénybe. A kivitelezés az autó típusától függően 2-4 órát szokott tartani.',
    },
    {
      question: 'Hogyan lehet időpontot kérni?',
      answer: 'Messengeren, telefonon (+36 30 399 9625) vagy emailen (dtlcustoms@info.com) lehet kapcsolatba lépni velünk. Szerda-vasárnap vagyunk nyitva.',
    },
    {
      question: 'Mire figyeljek a fóliázás után?',
      answer: 'Az első 48 órában kerülje az autó mosást. Utána normál gondozás ajánlott. A fólia hosszú élettartamú és könnyen kezelhető.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          <div className="font-display text-2xl font-bold">DTL Customs</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="font-body text-sm hover:text-accent transition">
              Szolgáltatások
            </a>
            <a href="#why" className="font-body text-sm hover:text-accent transition">
              Miért minket?
            </a>
            <a href="#gallery" className="font-body text-sm hover:text-accent transition">
              Munkáink
            </a>
            <a href="#faq" className="font-body text-sm hover:text-accent transition">
              GYIK
            </a>
            <a href="#contact" className="font-body text-sm hover:text-accent transition">
              Kapcsolat
            </a>
            <button className="btn-primary">Időpontfoglalás</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] flex items-center overflow-hidden pt-20">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          {/* Left: Copy & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6 z-10"
          >
            <h1 className="hero-headline text-white">
              Prémium autóüveg-fóliázás
            </h1>
            <p className="hero-subheadline text-white/80 max-w-md">
              UV- és hővédelem, diszkrétebb megjelenés, kényelmesebb utastér. Minőségi kivitelezés, gyors kapcsolatfelvétel, prémium megjelenés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn-primary">Időpontot kérek</button>
              <button className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white/20">
                Kapcsolat Messengeren
              </button>
            </div>
            <p className="font-body text-sm text-white/60 pt-4">
              Telefonos egyeztetés • Messenger • Nyitva: szerda–vasárnap
            </p>
          </motion.div>

          {/* Right: Animated Car with Advanced Tint Animation */}
          <div className="relative h-full flex items-center justify-center">
            <HeroAnimation carImageUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663484977226/PDCnGRWrpwew4UbLR7rtwx/hero-car-side-profile-dWe3yM5yRoXB4HtFKUiHPy.webp" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>

      {/* Quick Value Strip */}
      <section className="bg-background py-16 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-2"
              >
                <h3 className="font-heading text-lg text-foreground">{benefit.title}</h3>
                <p className="font-body text-sm text-foreground/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section id="why" className="bg-background py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="section-headline">Nem csak jól néz ki. Jobban is használható lesz az autód.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-heading text-xl mb-2">Nyári hőterhelés csökkentése</h3>
                <p className="font-body text-foreground/70">
                  A prémium fólia jelentősen csökkenti az autó belsejében a hőterhelést, így kényelmesebb és gazdaságosabb az utazás.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl mb-2">Zavaró fény ellen</h3>
                <p className="font-body text-foreground/70">
                  Az árnyékolás csökkenti a zavaró fényt, javítva a vezetési kényelmet és a biztonságot.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl mb-2">Privátabb utastér</h3>
                <p className="font-body text-foreground/70">
                  Diszkrét megjelenés, amely megvédi az utasteret és javítja az autó esztétikáját.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-heading text-xl mb-2">UV-védelem</h3>
                <p className="font-body text-foreground/70">
                  Megvédi az autó belsejét az UV sugárzástól, hosszabbítva az utastér és a bútorok élettartamát.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl mb-2">Komfortosabb vezetési élmény</h3>
                <p className="font-body text-foreground/70">
                  Az összes tényező együtt egy jobb, komfortosabb és biztonságosabb vezetési élményt nyújt.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl mb-2">Igényesebb megjelenés</h3>
                <p className="font-body text-foreground/70">
                  A prémium fóliázás az autó értékét és stílusát emeli, professzionális és luxus hatást kelt.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-secondary/30 py-24 border-y border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="section-headline">Mit ad a prémium autóüveg-fóliázás?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background p-8 rounded-lg border border-border hover:shadow-lg transition-all"
              >
                <h3 className="font-heading text-lg mb-3">{service.title}</h3>
                <p className="font-body text-sm text-foreground/70">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-background py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="section-headline">Egyszerű folyamat, gyors egyeztetés</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {process.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display text-2xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg mb-2">{item.title}</h3>
                <p className="font-body text-sm text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-secondary/30 py-24 border-y border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="section-headline">Munkáink</h2>
            <p className="font-body text-foreground/70 mt-4 max-w-2xl">
              Prémium autóüveg-fóliázási munkák, amelyek az autó értékét és stílusát emelik.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="aspect-square bg-gradient-to-br from-muted to-secondary rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="w-full h-full flex items-center justify-center bg-muted/50">
                  <p className="font-body text-foreground/50">Munkaminta {idx}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-background py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="section-headline">Miért minket választanak?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Prémium megjelenés', desc: 'Professzionális és luxus hatás' },
              { title: 'Minőségi kivitelezés', desc: 'Precíz munka, prémium anyagok' },
              { title: 'Gyors elérhetőség', desc: 'Messengeren, telefonon, emailen' },
              { title: 'Helyi szolgáltatás', desc: 'Szombathely, személyes konzultáció' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <h3 className="font-heading text-lg mb-2">{item.title}</h3>
                <p className="font-body text-sm text-foreground/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-secondary/30 py-24 border-y border-border">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="section-headline">Gyakori kérdések</h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-background border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition"
                >
                  <h3 className="font-heading text-left">{item.question}</h3>
                  {expandedFaq === idx ? (
                    <Minus className="w-5 h-5 text-accent flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-accent flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-4 border-t border-border bg-secondary/20"
                  >
                    <p className="font-body text-foreground/70">{item.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-background py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-headline mb-4">Kérj időpontot vagy érdeklődj most</h2>
            <p className="font-body text-foreground/70">
              Töltsd ki az alábbi űrlapot, és hamarosan felvesszük veled a kapcsolatot.
            </p>
          </motion.div>

          {/* Contact Form */}
          <div className="mb-16 bg-secondary/30 p-8 rounded-lg border border-border">
            <ContactForm />
          </div>

          {/* Alternative Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.a
              href="tel:+36303999625"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-secondary/50 p-8 rounded-lg text-center hover:bg-accent hover:text-accent-foreground transition-all group"
            >
              <Phone className="w-8 h-8 mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="font-heading mb-2">Telefon</h3>
              <p className="font-body text-sm">+36 30 399 9625</p>
            </motion.a>

            <motion.a
              href="mailto:dtlcustoms@info.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-secondary/50 p-8 rounded-lg text-center hover:bg-accent hover:text-accent-foreground transition-all group"
            >
              <Mail className="w-8 h-8 mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="font-heading mb-2">Email</h3>
              <p className="font-body text-sm">dtlcustoms@info.com</p>
            </motion.a>

            <motion.a
              href="https://m.me/61587179489147"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-secondary/50 p-8 rounded-lg text-center hover:bg-accent hover:text-accent-foreground transition-all group"
            >
              <MessageCircle className="w-8 h-8 mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="font-heading mb-2">Messenger</h3>
              <p className="font-body text-sm">Üzenet küldése</p>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 bg-secondary/30 rounded-lg border border-border text-center"
          >
            <p className="font-body text-foreground/70">
              <span className="font-heading">Nyitva: szerda–vasárnap</span>
            </p>
            <p className="font-body text-sm text-foreground/60 mt-2">
              Szombathely, Körmendi út 45
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-display text-lg mb-4">DTL Customs</h3>
              <p className="font-body text-sm opacity-70">Prémium autóüveg-fóliázás Szombathelyen</p>
            </div>
            <div>
              <h4 className="font-heading text-sm mb-3">Elérhetőség</h4>
              <ul className="font-body text-sm space-y-2 opacity-70">
                <li>+36 30 399 9625</li>
                <li>dtlcustoms@info.com</li>
                <li>Messenger</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm mb-3">Nyitva</h4>
              <p className="font-body text-sm opacity-70">Szerda–vasárnap</p>
            </div>
            <div>
              <h4 className="font-heading text-sm mb-3">Hely</h4>
              <p className="font-body text-sm opacity-70">Szombathely, Körmendi út 45</p>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8">
            <p className="font-body text-sm opacity-70 text-center">
              © 2026 DTL Customs. Minden jog fenntartva.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
