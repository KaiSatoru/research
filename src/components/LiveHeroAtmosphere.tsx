"use client";

import React, { useEffect, useRef } from "react";

export function LiveHeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle system for electric embers / lightning sparks
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxAlpha: number;
      decay: number;
      color: string;
      flickerSpeed: number;
    }

    const sparks: Spark[] = [];
    const maxSparks = 45;

    const colors = [
      "rgba(45, 212, 191, ", // Teal-400
      "rgba(20, 184, 166, ", // Teal-500
      "rgba(94, 234, 212, ", // Teal-300
      "rgba(204, 251, 241, ", // White-Teal spark
    ];

    function createSpark(initRandom = false): Spark {
      // Spawn near the bottom right area where Zenitsu & lightning are located
      const spawnX = width * (0.65 + Math.random() * 0.35);
      const spawnY = initRandom
        ? height * (0.4 + Math.random() * 0.6)
        : height * (0.6 + Math.random() * 0.4);

      return {
        x: spawnX,
        y: spawnY,
        vx: (Math.random() - 0.5) * 1.5 - 0.5, // Slight drift left/up
        vy: -0.8 - Math.random() * 1.8, // Float upward
        size: 1 + Math.random() * 2.2,
        alpha: initRandom ? Math.random() * 0.8 : 0.1,
        maxAlpha: 0.4 + Math.random() * 0.6,
        decay: 0.004 + Math.random() * 0.009,
        color: colors[Math.floor(Math.random() * colors.length)],
        flickerSpeed: 0.05 + Math.random() * 0.1,
      };
    }

    // Initialize initial sparks
    for (let i = 0; i < maxSparks; i++) {
      sparks.push(createSpark(true));
    }

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Render & update sparks
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha += Math.sin(tick * s.flickerSpeed) * 0.04;

        if (s.alpha > s.maxAlpha) s.alpha = s.maxAlpha;
        if (s.alpha < 0.1) s.alpha = 0.1;

        // Draw glowing particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#14b8a6";
        ctx.fill();
        ctx.restore();

        // Respawn when out of bounds or faded
        if (s.y < height * 0.2 || s.x < 0 || s.x > width) {
          sparks[i] = createSpark(false);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Canvas for Live Electric Sparks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[4] mix-blend-screen"
      />

      {/* Atmospheric Breathing Electric Glow (CSS Animation) */}
      <div className="absolute right-[-5%] bottom-[-5%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full pointer-events-none z-[3] mix-blend-screen animate-pulse duration-[4000ms] bg-gradient-to-tl from-teal-500/25 via-teal-600/10 to-transparent blur-3xl opacity-80" />

      {/* Subtle Electric Lightning Flash Accent */}
      <div className="absolute right-[12%] bottom-[15%] w-72 h-72 rounded-full pointer-events-none z-[3] bg-teal-400/15 blur-2xl animate-ping duration-[6000ms] opacity-50" />
    </>
  );
}
