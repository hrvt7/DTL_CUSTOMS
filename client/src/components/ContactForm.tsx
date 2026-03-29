import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * ContactForm Component - Formspree Integration
 * Handles contact form submissions with validation and feedback
 * Sends emails to: dtlcustoms@info.com
 */

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Kérjük, töltse ki az összes kötelező mezőt.',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Kérjük, adjon meg egy érvényes email címet.',
      });
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Üzenet küldése...',
    });

    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xyzjkwvl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `Új kapcsolatfelvételi kérés: ${formData.name}`,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Köszönjük! Üzenetét sikeresen elküldtük. Hamarosan felvesszük Önnel a kapcsolatot.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        // Reset form after 5 seconds
        setTimeout(() => {
          setStatus({
            type: 'idle',
            message: '',
          });
        }, 5000);
      } else {
        setStatus({
          type: 'error',
          message: 'Hiba történt az üzenet küldése során. Kérjük, próbálja újra később.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Hiba történt az üzenet küldése során. Kérjük, próbálja újra később.',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block font-heading text-sm mb-2">
            Név *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Teljes név"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent transition"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block font-heading text-sm mb-2">
            Email cím *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent transition"
            required
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block font-heading text-sm mb-2">
            Telefonszám (opcionális)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+36 30 123 4567"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent transition"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block font-heading text-sm mb-2">
            Üzenet *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Írja meg üzenetét..."
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent transition resize-none"
            required
          />
        </div>

        {/* Status Messages */}
        {status.type === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200"
          >
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="font-body text-sm text-green-800">{status.message}</p>
          </motion.div>
        )}

        {status.type === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="font-body text-sm text-red-800">{status.message}</p>
          </motion.div>
        )}

        {status.type === 'loading' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200"
          >
            <div className="w-5 h-5 rounded-full border-2 border-blue-300 border-t-blue-600 animate-spin" />
            <p className="font-body text-sm text-blue-800">{status.message}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          Üzenet küldése
        </button>

        <p className="font-body text-xs text-foreground/60 text-center">
          * Kötelező mezők
        </p>
      </form>
    </motion.div>
  );
}
