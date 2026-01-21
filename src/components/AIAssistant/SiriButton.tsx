import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SiriButtonProps {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  onClick: () => void;
  className?: string;
}

export const SiriButton = ({ 
  isActive, 
  isListening, 
  isSpeaking, 
  onClick,
  className 
}: SiriButtonProps) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [waveAmplitudes, setWaveAmplitudes] = useState<number[]>([0.5, 0.3, 0.7, 0.4, 0.6]);
  const [chaosPoints, setChaosPoints] = useState<{x: number; y: number; vx: number; vy: number}[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize chaos points
  useEffect(() => {
    const points = Array.from({ length: 12 }, () => ({
      x: 32 + (Math.random() - 0.5) * 20,
      y: 32 + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    }));
    setChaosPoints(points);
  }, []);

  // Continuous idle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 2) % 360);
      
      // Update chaos points with organic movement
      setChaosPoints(prev => prev.map(point => {
        let { x, y, vx, vy } = point;
        
        // Add some random acceleration for chaos
        vx += (Math.random() - 0.5) * 0.3;
        vy += (Math.random() - 0.5) * 0.3;
        
        // Damping
        vx *= 0.95;
        vy *= 0.95;
        
        // Update position
        x += vx;
        y += vy;
        
        // Keep within bounds with soft bounce
        const centerX = 32;
        const centerY = 32;
        const maxDist = 22;
        const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        
        if (dist > maxDist) {
          const angle = Math.atan2(y - centerY, x - centerX);
          x = centerX + Math.cos(angle) * maxDist;
          y = centerY + Math.sin(angle) * maxDist;
          vx = -vx * 0.5;
          vy = -vy * 0.5;
        }
        
        return { x, y, vx, vy };
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Wave amplitudes for speaking/listening effect
  useEffect(() => {
    if (isSpeaking || isListening) {
      const interval = setInterval(() => {
        setWaveAmplitudes(prev => 
          prev.map(() => 0.3 + Math.random() * 0.7)
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isSpeaking, isListening]);

  // Draw chaotic Siri-style animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw chaos background glow
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
    bgGradient.addColorStop(0, 'hsla(213, 94%, 50%, 0.3)');
    bgGradient.addColorStop(0.5, 'hsla(220, 100%, 60%, 0.15)');
    bgGradient.addColorStop(1, 'hsla(213, 94%, 50%, 0.05)');
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = bgGradient;
    ctx.fill();

    // Draw chaotic flowing particles
    chaosPoints.forEach((point, i) => {
      const hue = (213 + i * 10 + animationPhase * 0.5) % 360;
      const size = 3 + Math.sin(animationPhase * 0.1 + i) * 1.5;
      const alpha = 0.6 + Math.sin(animationPhase * 0.05 + i * 0.5) * 0.3;
      
      // Particle glow
      const glowGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size * 2);
      glowGradient.addColorStop(0, `hsla(${hue}, 90%, 70%, ${alpha})`);
      glowGradient.addColorStop(0.5, `hsla(${hue}, 90%, 60%, ${alpha * 0.5})`);
      glowGradient.addColorStop(1, `hsla(${hue}, 90%, 50%, 0)`);
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
      
      // Core particle
      ctx.beginPath();
      ctx.arc(point.x, point.y, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${alpha + 0.2})`;
      ctx.fill();
    });

    // Draw connecting lines between nearby particles for chaos web effect
    ctx.strokeStyle = 'hsla(213, 90%, 70%, 0.15)';
    ctx.lineWidth = 0.5;
    chaosPoints.forEach((p1, i) => {
      chaosPoints.slice(i + 1).forEach(p2 => {
        const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        if (dist < 20) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.globalAlpha = 1 - dist / 20;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
    });

    if (isActive || isSpeaking || isListening) {
      // Draw animated orb layers with more chaos
      const layers = 4;
      for (let i = layers; i >= 0; i--) {
        const progress = (animationPhase + i * 60) % 360;
        const wobble = Math.sin(progress * 3 * Math.PI / 180) * 2;
        const radius = 18 + i * 2.5 + Math.sin(progress * Math.PI / 180) * 3 + wobble;
        const alpha = 0.12 - i * 0.02;
        
        const gradient = ctx.createRadialGradient(
          centerX + Math.sin(progress * Math.PI / 90) * 2, 
          centerY + Math.cos(progress * Math.PI / 90) * 2, 
          0, 
          centerX, centerY, radius
        );
        
        if (isListening) {
          gradient.addColorStop(0, `hsla(280, 100%, 65%, ${alpha + 0.25})`);
          gradient.addColorStop(0.5, `hsla(320, 100%, 60%, ${alpha + 0.15})`);
          gradient.addColorStop(1, `hsla(240, 100%, 55%, ${alpha})`);
        } else if (isSpeaking) {
          gradient.addColorStop(0, `hsla(200, 100%, 65%, ${alpha + 0.25})`);
          gradient.addColorStop(0.5, `hsla(180, 100%, 60%, ${alpha + 0.15})`);
          gradient.addColorStop(1, `hsla(220, 100%, 55%, ${alpha})`);
        } else {
          const hue1 = (progress) % 360;
          const hue2 = (progress + 120) % 360;
          gradient.addColorStop(0, `hsla(${hue1}, 100%, 65%, ${alpha + 0.15})`);
          gradient.addColorStop(0.5, `hsla(${hue2}, 100%, 60%, ${alpha + 0.1})`);
          gradient.addColorStop(1, `hsla(213, 100%, 55%, ${alpha})`);
        }
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw wave bars for speaking/listening
      if (isSpeaking || isListening) {
        const barCount = 5;
        const barWidth = 3;
        const maxBarHeight = 16;
        const startX = centerX - ((barCount - 1) * 6) / 2;
        
        for (let i = 0; i < barCount; i++) {
          const amplitude = waveAmplitudes[i] || 0.5;
          const barHeight = maxBarHeight * amplitude;
          const x = startX + i * 6;
          const y = centerY - barHeight / 2;
          
          const barGradient = ctx.createLinearGradient(x, y, x, y + barHeight);
          if (isListening) {
            barGradient.addColorStop(0, 'rgba(255, 100, 255, 0.9)');
            barGradient.addColorStop(1, 'rgba(100, 100, 255, 0.9)');
          } else {
            barGradient.addColorStop(0, 'rgba(100, 200, 255, 0.9)');
            barGradient.addColorStop(1, 'rgba(100, 255, 200, 0.9)');
          }
          
          ctx.beginPath();
          ctx.roundRect(x - barWidth / 2, y, barWidth, barHeight, barWidth / 2);
          ctx.fillStyle = barGradient;
          ctx.fill();
        }
      }
    } else {
      // Idle state - chaotic pulsing core
      const pulseRadius = 15 + Math.sin(animationPhase * Math.PI / 180) * 2;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius + 8);
      gradient.addColorStop(0, 'hsla(0, 0%, 100%, 0.9)');
      gradient.addColorStop(0.3, 'hsla(213, 94%, 65%, 0.6)');
      gradient.addColorStop(0.6, 'hsla(220, 90%, 55%, 0.3)');
      gradient.addColorStop(1, 'hsla(213, 94%, 50%, 0.1)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Multiple rotating ring segments for chaotic look
      for (let ring = 0; ring < 3; ring++) {
        const ringRadius = 20 + ring * 4 + Math.sin((animationPhase + ring * 30) * Math.PI / 180) * 2;
        const startAngle = (animationPhase * (ring % 2 === 0 ? 1 : -1) + ring * 40) * Math.PI / 180;
        const arcLength = Math.PI * (0.4 + Math.sin(animationPhase * Math.PI / 90) * 0.2);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, startAngle, startAngle + arcLength);
        ctx.strokeStyle = `hsla(${213 + ring * 15}, 90%, 65%, ${0.4 - ring * 0.1})`;
        ctx.lineWidth = 1.5 - ring * 0.3;
        ctx.stroke();
      }
    }
  }, [animationPhase, isActive, isListening, isSpeaking, waveAmplitudes, chaosPoints]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-16 h-16 rounded-full transition-all duration-300",
        "shadow-lg hover:shadow-xl hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-accent/50",
        "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        isActive ? "scale-110" : "",
        className
      )}
      aria-label="AI助手"
    >
      {/* Outer chaotic glow */}
      <div 
        className={cn(
          "absolute -inset-2 rounded-full blur-lg transition-opacity",
          isActive || isSpeaking ? "opacity-70" : "opacity-50"
        )}
        style={{
          background: `conic-gradient(from ${animationPhase}deg, 
            hsl(213, 94%, 55%), 
            hsl(240, 80%, 60%), 
            hsl(280, 70%, 55%),
            hsl(320, 80%, 55%),
            hsl(200, 90%, 55%),
            hsl(213, 94%, 55%))`
        }}
      />
      
      {/* Dark inner circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Pulsing chaotic rings when active */}
      {(isActive || isSpeaking || isListening) && (
        <>
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{
              background: `conic-gradient(from ${animationPhase}deg, 
                hsl(213, 94%, 55%), 
                hsl(280, 80%, 55%), 
                hsl(213, 94%, 55%))`
            }}
          />
          <div 
            className="absolute -inset-3 rounded-full animate-pulse opacity-15"
            style={{
              background: `conic-gradient(from ${-animationPhase}deg, 
                hsl(200, 90%, 60%), 
                hsl(320, 80%, 55%),
                hsl(200, 90%, 60%))`
            }}
          />
        </>
      )}

      {/* Canvas for wave animation */}
      <canvas
        ref={canvasRef}
        width={64}
        height={64}
        className="absolute inset-0 w-full h-full rounded-full"
      />
    </button>
  );
};
