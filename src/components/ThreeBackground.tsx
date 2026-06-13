'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ThreeBackgroundProps {
  isSuccess: boolean;
}

interface Meteorite {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
  active: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function ThreeBackground({ isSuccess }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  const planetRef = useRef<HTMLCanvasElement>(null);
  const foregroundRef = useRef<HTMLCanvasElement>(null);
  const meteoriteRef = useRef<HTMLCanvasElement>(null);

  const isSuccessRef = useRef(isSuccess);

  // Keep success flag updated in animation loop
  useEffect(() => {
    isSuccessRef.current = isSuccess;
  }, [isSuccess]);

  useEffect(() => {
    const starsCanvas = starsRef.current;
    const planetCanvas = planetRef.current;
    const foregroundCanvas = foregroundRef.current;
    const metCanvas = meteoriteRef.current;

    if (!starsCanvas || !planetCanvas || !foregroundCanvas || !metCanvas) return;

    const img = new Image();
    img.src = '/moon.png';
    img.onload = () => {
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      // Set internal resolutions to match the source image.
      // Because all layers use the same dimensions, they will register and align
      // perfectly with each other responsive cover-scaled.
      starsCanvas.width = imgW;
      starsCanvas.height = imgH;

      planetCanvas.width = imgW;
      planetCanvas.height = imgH;

      foregroundCanvas.width = imgW;
      foregroundCanvas.height = imgH;

      const ctxStars = starsCanvas.getContext('2d');
      const ctxPlanet = planetCanvas.getContext('2d');
      const ctxForeground = foregroundCanvas.getContext('2d');

      if (!ctxStars || !ctxPlanet || !ctxForeground) return;

      // 1. Precise coordinates decoded from grid scanning
      const cX = imgW * 0.70;
      const cY = imgH * 0.505;
      const rX = imgW * 0.08;
      const rY = imgH * 0.095;

      // 2. Render Layer 1: Background Starfield
      ctxStars.drawImage(img, 0, 0);

      // Blackout crescent planet on background layer (prevents ghost duplication on scale)
      ctxStars.fillStyle = '#030308';
      ctxStars.beginPath();
      ctxStars.ellipse(cX, cY, rX * 1.15, rY * 1.15, 0, 0, Math.PI * 2);
      ctxStars.fill();

      // Blackout bottom foreground moon horizon
      ctxStars.beginPath();
      ctxStars.moveTo(0, imgH * 0.60);
      ctxStars.lineTo(imgW, imgH * 0.67);
      ctxStars.lineTo(imgW, imgH);
      ctxStars.lineTo(0, imgH);
      ctxStars.closePath();
      ctxStars.fill();

      // 3. Render Layer 2: Midground Planet (Clipped circular crescent cutout)
      ctxPlanet.clearRect(0, 0, imgW, imgH);
      ctxPlanet.save();
      ctxPlanet.beginPath();
      ctxPlanet.ellipse(cX, cY, rX, rY, 0, 0, Math.PI * 2);
      ctxPlanet.clip();
      ctxPlanet.drawImage(img, 0, 0);
      ctxPlanet.restore();

      // 4. Render Layer 3: Foreground Moon Surface (Clipped bottom horizon cutout)
      ctxForeground.clearRect(0, 0, imgW, imgH);
      ctxForeground.save();
      ctxForeground.beginPath();
      ctxForeground.moveTo(0, imgH * 0.62);
      ctxForeground.lineTo(imgW, imgH * 0.69);
      ctxForeground.lineTo(imgW, imgH);
      ctxForeground.lineTo(0, imgH);
      ctxForeground.closePath();
      ctxForeground.clip();
      ctxForeground.drawImage(img, 0, 0);
      ctxForeground.restore();

      // 5. Setup GSAP ScrollTrigger Timeline
      // Timeline binds directly to body scroll with smooth scrubbing inertia
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        }
      });

      // Foreground horizon scales up rapidly and fades away early
      tl.to(foregroundCanvas, {
        scale: 2.6,
        opacity: 0,
        y: '22%',
        ease: 'power1.inOut'
      }, 0);

      // Midground crescent moon scales moderately
      tl.to(planetCanvas, {
        scale: 1.4,
        x: '-6%',
        y: '6%',
        ease: 'power1.inOut'
      }, 0);

      // Stars background barely scales to suggest infinite space depth
      tl.to(starsCanvas, {
        scale: 1.06,
        ease: 'power1.inOut'
      }, 0);
    };

    // 6. Meteorite and Spark canvas overlay setup
    const ctxMet = metCanvas.getContext('2d');
    if (!ctxMet) return;

    let animId: number;
    const meteorites: Meteorite[] = [];
    const sparks: Spark[] = [];

    const resizeMetCanvas = () => {
      metCanvas.width = window.innerWidth;
      metCanvas.height = window.innerHeight;
    };
    resizeMetCanvas();
    window.addEventListener('resize', resizeMetCanvas);

    let lastSpawnTime = 0;

    const spawnMeteorite = () => {
      const w = metCanvas.width;
      const h = metCanvas.height;

      // Spawn off-screen at top right
      const x = w * (0.6 + Math.random() * 0.4);
      const y = -30;

      // Diagonal speed pointing down and left
      const speed = h * (0.7 + Math.random() * 0.45);
      const angle = Math.PI * (1.15 + Math.random() * 0.1);

      const vx = Math.cos(angle) * speed;
      const vy = -Math.sin(angle) * speed;

      meteorites.push({
        x,
        y,
        vx,
        vy,
        trail: [],
        active: true
      });
    };

    const triggerSparks = (x: number, y: number) => {
      const count = 30 + Math.floor(Math.random() * 15);
      const colors = ['#ffffff', '#ffe79a', '#f97316', '#ef4444'];
      for (let i = 0; i < count; i++) {
        // Direct sparks upward and outward in a fan shape
        const angle = Math.PI * (0.1 + Math.random() * 0.8) - Math.PI / 2;
        const speed = 120 + Math.random() * 220;
        const vx = Math.cos(angle) * speed;
        const vy = -Math.sin(angle) * speed - 60; // Extra upward velocity
        const maxLife = 0.45 + Math.random() * 0.65;
        const color = colors[Math.floor(Math.random() * colors.length)];

        sparks.push({
          x,
          y,
          vx,
          vy,
          life: maxLife,
          maxLife,
          color
        });
      }
    };

    let lastTime = performance.now();

    const loop = (time: number) => {
      animId = requestAnimationFrame(loop);

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const w = metCanvas.width;
      const h = metCanvas.height;

      ctxMet.clearRect(0, 0, w, h);

      // Spawn meteorites periodically on success
      if (isSuccessRef.current) {
        if (time - lastSpawnTime > 220 && meteorites.length < 15) {
          spawnMeteorite();
          lastSpawnTime = time;
        }
      }

      // Update and draw meteorites
      for (let i = meteorites.length - 1; i >= 0; i--) {
        const met = meteorites[i];

        met.trail.push({ x: met.x, y: met.y });
        if (met.trail.length > 7) {
          met.trail.shift();
        }

        met.x += met.vx * dt;
        met.y += met.vy * dt;

        // Visual horizon slope on screen: y = h * (0.65 + (x/w)*0.08)
        const colY = h * (0.66 + (met.x / w) * 0.08);

        if (met.y >= colY) {
          if (met.x >= 0 && met.x <= w) {
            triggerSparks(met.x, met.y);
          }
          meteorites.splice(i, 1);
        } else if (met.x < -50 || met.y > h + 50) {
          meteorites.splice(i, 1);
        } else {
          // Render fading orange tail trail
          if (met.trail.length > 1) {
            ctxMet.beginPath();
            ctxMet.moveTo(met.trail[0].x, met.trail[0].y);
            for (let j = 1; j < met.trail.length; j++) {
              ctxMet.lineTo(met.trail[j].x, met.trail[j].y);
            }
            ctxMet.strokeStyle = 'rgba(249, 115, 22, 0.45)';
            ctxMet.lineWidth = 1.8;
            ctxMet.stroke();
          }

          // Glowing head
          ctxMet.beginPath();
          ctxMet.arc(met.x, met.y, 2.2, 0, Math.PI * 2);
          ctxMet.fillStyle = '#ffe699';
          ctxMet.fill();
        }
      }

      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx * dt;
        spark.y += spark.vy * dt;

        // Apply downward gravity and drag friction
        spark.vy += 320 * dt;
        spark.vx *= 0.94;
        spark.vy *= 0.94;

        spark.life -= dt;

        if (spark.life <= 0) {
          sparks.splice(i, 1);
        } else {
          const alpha = spark.life / spark.maxLife;
          ctxMet.beginPath();
          ctxMet.arc(spark.x, spark.y, 1.2 + alpha * 1.5, 0, Math.PI * 2);
          ctxMet.fillStyle = spark.color;
          ctxMet.globalAlpha = alpha;
          ctxMet.fill();
          ctxMet.globalAlpha = 1.0;
        }
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeMetCanvas);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 w-full h-full overflow-hidden select-none pointer-events-none"
      style={{ background: '#030308' }}
    >
      {/* Background Starfield */}
      <canvas
        ref={starsRef}
        className="absolute inset-0 w-full h-full object-cover origin-center will-change-transform"
      />
      {/* Midground Planet */}
      <canvas
        ref={planetRef}
        className="absolute inset-0 w-full h-full object-cover origin-center will-change-transform"
      />
      {/* Foreground Moon Surface */}
      <canvas
        ref={foregroundRef}
        className="absolute inset-0 w-full h-full object-cover origin-center will-change-transform"
      />
      {/* Meteorite Shower Overlay */}
      <canvas
        ref={meteoriteRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
}
