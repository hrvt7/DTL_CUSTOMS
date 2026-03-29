import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * HeroAnimation Component - Advanced Car Tint Animation
 * Features:
 * - Static car image with animated tint overlay
 * - Smooth gradient transitions between tint levels
 * - Canvas-based animation for smooth performance
 * - Subtle UV/heat effects
 * - Professional automotive feel
 */

interface HeroAnimationProps {
  carImageUrl: string;
  carAlt?: string;
}

export default function HeroAnimation({ carImageUrl, carAlt = 'Premium car side profile' }: HeroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Animation parameters
    const cycleDuration = 12000; // 12 seconds for full cycle
    let startTime = Date.now();

    // Tint color progression
    const tintColors = [
      { r: 255, g: 255, b: 255, a: 0 },      // Clear (no tint)
      { r: 240, g: 200, b: 120, a: 0.15 },   // Light amber tint
      { r: 180, g: 180, b: 180, a: 0.35 },   // Medium gray tint
      { r: 60, g: 80, b: 100, a: 0.55 },     // Dark blue-gray tint
    ];

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % cycleDuration) / cycleDuration;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate current tint based on progress
      let currentTintIndex = Math.floor(progress * (tintColors.length - 1));
      let nextTintIndex = (currentTintIndex + 1) % tintColors.length;
      let lerpProgress = (progress * (tintColors.length - 1)) % 1;

      // Smooth easing function (ease-in-out)
      const easeProgress = lerpProgress < 0.5 
        ? 2 * lerpProgress * lerpProgress 
        : -1 + (4 - 2 * lerpProgress) * lerpProgress;

      const currentTint = tintColors[currentTintIndex];
      const nextTint = tintColors[nextTintIndex];

      // Interpolate color
      const tintColor = {
        r: Math.round(currentTint.r + (nextTint.r - currentTint.r) * easeProgress),
        g: Math.round(currentTint.g + (nextTint.g - currentTint.g) * easeProgress),
        b: Math.round(currentTint.b + (nextTint.b - currentTint.b) * easeProgress),
        a: currentTint.a + (nextTint.a - currentTint.a) * easeProgress,
      };

      // Draw main tint overlay
      ctx.fillStyle = `rgba(${tintColor.r}, ${tintColor.g}, ${tintColor.b}, ${tintColor.a})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle UV protection glow (fades as tint increases)
      const glowIntensity = Math.max(0, 0.3 - tintColor.a * 0.5);
      if (glowIntensity > 0) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(255, 200, 100, 0)`);
        gradient.addColorStop(0.5, `rgba(255, 200, 100, ${glowIntensity * 0.1})`);
        gradient.addColorStop(1, `rgba(255, 200, 100, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Add subtle reflection effect (glass shine)
      const reflectionGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      reflectionGradient.addColorStop(0, `rgba(255, 255, 255, ${0.1 - tintColor.a * 0.15})`);
      reflectionGradient.addColorStop(0.3, `rgba(255, 255, 255, 0)`);
      reflectionGradient.addColorStop(0.7, `rgba(0, 0, 0, 0)`);
      reflectionGradient.addColorStop(1, `rgba(0, 0, 0, ${tintColor.a * 0.1})`);
      ctx.fillStyle = reflectionGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full max-w-2xl h-auto"
    >
      {/* Car Image */}
      <img
        src={carImageUrl}
        alt={carAlt}
        className="w-full h-auto object-contain relative z-10"
      />

      {/* Animated Tint Overlay Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          mixBlendMode: 'multiply',
          opacity: 0.9,
        }}
      />

      {/* Progress Indicator Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {[0, 1, 2, 3].map((idx) => (
          <motion.div
            key={idx}
            className="h-2 rounded-full bg-white/30"
            animate={{
              width: ['8px', '8px', '8px', '8px'],
              backgroundColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.3)'],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: idx * 3,
            }}
            style={{
              width: '8px',
            }}
          />
        ))}
      </div>

      {/* Tint Level Label (optional) */}
      <motion.div
        className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur px-4 py-2 rounded-lg"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
      >
        <p className="text-white text-xs font-heading">
          Tint Animation Active
        </p>
      </motion.div>
    </motion.div>
  );
}
