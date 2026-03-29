import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const cycleDuration = 14000;
    let startTime = Date.now();

    const tintColors = [
      { r: 255, g: 255, b: 255, a: 0 },
      { r: 220, g: 220, b: 220, a: 0.25 },
      { r: 150, g: 170, b: 190, a: 0.45 },
      { r: 40, g: 60, b: 90, a: 0.65 },
    ];

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % cycleDuration) / cycleDuration;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let currentTintIndex = Math.floor(progress * (tintColors.length - 1));
      let nextTintIndex = (currentTintIndex + 1) % tintColors.length;
      let lerpProgress = (progress * (tintColors.length - 1)) % 1;

      const easeProgress = lerpProgress < 0.5 
        ? 2 * lerpProgress * lerpProgress 
        : -1 + (4 - 2 * lerpProgress) * lerpProgress;

      const currentTint = tintColors[currentTintIndex];
      const nextTint = tintColors[nextTintIndex];

      const tintColor = {
        r: Math.round(currentTint.r + (nextTint.r - currentTint.r) * easeProgress),
        g: Math.round(currentTint.g + (nextTint.g - currentTint.g) * easeProgress),
        b: Math.round(currentTint.b + (nextTint.b - currentTint.b) * easeProgress),
        a: currentTint.a + (nextTint.a - currentTint.a) * easeProgress,
      };

      ctx.fillStyle = `rgba(${tintColor.r}, ${tintColor.g}, ${tintColor.b}, ${tintColor.a})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const reflectionGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      reflectionGradient.addColorStop(0, `rgba(255, 255, 255, ${0.15 - tintColor.a * 0.2})`);
      reflectionGradient.addColorStop(0.5, `rgba(255, 255, 255, 0)`);
      reflectionGradient.addColorStop(1, `rgba(0, 0, 0, ${tintColor.a * 0.08})`);
      ctx.fillStyle = reflectionGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqItems = [
    {
      question: 'Milyen szintű árnyékolást ajánlotok?',
      answer: 'Az ideális árnyékolás az Ön igényeitől függ. Ajánlunk könnyű (20%), közepes (50%) vagy prémium sötét (70%) fóliákat. Konzultáció során személyre szabott ajánlatot adunk.',
    },
    {
      question: 'Mennyi ideig tart a fóliázás?',
      answer: 'Az átlagos autó fóliázása 2-4 órát vesz igénybe. Az egyeztetés során pontosan meghatározzuk az időpontot.',
    },
    {
      question: 'Milyen az élettartama a fóliának?',
      answer: 'Prémium fóliáink 5-10 évig tartanak, attól függően, hogy mennyire kitett az autó a napsugárzásnak.',
    },
    {
      question: 'Hogyan kell gondozni a fóliát?',
      answer: 'Az első 48 órában kerülje az autó mosást. Utána normál gondozás ajánlott. A fólia könnyen kezelhető és hosszú élettartamú.',
    },
  ];

  return (
    <div className="bg-white text-black overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-black/5' : 'bg-transparent'
      }`}>
        <div className="container max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold tracking-tight"
          >
            DTL CUSTOMS
          </motion.div>
          <div className="hidden md:flex items-center gap-12">
            <a href="#services" className="text-sm hover:text-accent transition">Szolgáltatások</a>
            <a href="#process" className="text-sm hover:text-accent transition">Folyamat</a>
            <a href="#faq" className="text-sm hover:text-accent transition">GYIK</a>
            <a href="#contact" className="text-sm hover:text-accent transition">Kapcsolat</a>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-sm"
          >
            Időpontfoglalás
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen bg-white flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484977226/PDCnGRWrpwew4UbLR7rtwx/hero-car-side-profile-dWe3yM5yRoXB4HtFKUiHPy.webp"
            alt="Premium car"
            className="w-full max-w-6xl h-auto object-contain"
          />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              mixBlendMode: 'multiply',
              opacity: 0.85,
            }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-6 relative z-10 flex items-center h-full">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6"
            >
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                Prémium Autóüveg-Fóliázás
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-7xl md:text-8xl font-black leading-none mb-8 tracking-tight"
            >
              Prémium
              <br />
              Megjelenés
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-lg text-black/70 mb-8 max-w-md leading-relaxed"
            >
              Professzionális autóüveg-fóliázás, amely megvédi az autót, javítja a stílust, és biztosítja a privátságot.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(74, 159, 216, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-4 text-base font-semibold"
              >
                Időpontot kérek
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-black hover:bg-black hover:text-white transition-all font-semibold rounded-lg"
              >
                Tudj meg többet
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-6 h-6 text-black/40" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-32 border-t border-black/5">
        <div className="container max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              Szolgáltatások
            </h2>
            <p className="text-xl text-black/60 max-w-2xl">
              Prémium fóliázási megoldások, amelyek megvédik az autót és javítják a megjelenést.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'UV- és Hővédelem',
                description: 'Prémium fólia technológia, amely csökkenti a nyári hőterhelést és megvédi az utasteret az UV sugárzástól.',
                icon: '☀️',
              },
              {
                title: 'Fényvédelem',
                description: 'Elegáns árnyékolás, amely csökkenti a zavaró fényt és javítja a vezetési kényelmet.',
                icon: '🌙',
              },
              {
                title: 'Privátabb Utastér',
                description: 'Diszkrét megjelenés, amely megvédi az utasteret és javítja az autó esztétikáját.',
                icon: '🔒',
              },
              {
                title: 'Prémium Megjelenés',
                description: 'Profi kivitelezés, amely az autó értékét és stílusát emeli.',
                icon: '✨',
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-8 border border-black/10 rounded-2xl hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-black/60 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="bg-black text-white py-32">
        <div className="container max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              A Folyamat
            </h2>
            <p className="text-xl text-white/60 max-w-2xl">
              Egyszerű, transzparens, és professzionális megoldás.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Kapcsolatfelvétel', desc: 'Messengeren, telefonon vagy emailen' },
              { step: '02', title: 'Konzultáció', desc: 'Személyre szabott ajánlat és időpont' },
              { step: '03', title: 'Kivitelezés', desc: 'Profi munka, prémium anyagok' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-black text-white/10 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
                {idx < 2 && (
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -right-16 top-1/2 transform -translate-y-1/2 hidden md:block"
                  >
                    <ArrowRight className="w-6 h-6 text-accent" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-32 border-t border-black/5">
        <div className="container max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              Gyakori Kérdések
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="border border-black/10 rounded-xl overflow-hidden hover:border-accent transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between hover:bg-black/2 transition-colors"
                >
                  <h3 className="text-lg font-bold text-left">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-accent" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 border-t border-black/5"
                    >
                      <p className="text-black/70 leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-black text-white py-32">
        <div className="container max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              Kapcsolat
            </h2>
            <p className="text-xl text-white/60">
              Vedd fel velünk a kapcsolatot, és kérj időpontot még ma.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur p-12 rounded-2xl border border-white/10 mb-12"
          >
            <ContactForm />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-white/60 mb-2">Telefon</p>
              <a href="tel:+36303999625" className="text-2xl font-bold hover:text-accent transition">
                +36 30 399 9625
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-white/60 mb-2">Email</p>
              <a href="mailto:dtlcustoms@info.com" className="text-2xl font-bold hover:text-accent transition">
                dtlcustoms@info.com
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-white/60 mb-2">Nyitva</p>
              <p className="text-2xl font-bold">Szerda–Vasárnap</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/40 text-sm">
            © 2026 DTL Customs. Prémium Autóüveg-Fóliázás. Szombathely.
          </p>
        </div>
      </footer>
    </div>
  );
}
