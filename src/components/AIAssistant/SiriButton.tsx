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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Continuous idle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 2) % 360);
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

  // Draw Siri-style wave animation
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

    if (isActive || isSpeaking || isListening) {
      // Draw animated orb layers
      const layers = 5;
      for (let i = layers; i >= 0; i--) {
        const progress = (animationPhase + i * 60) % 360;
        const radius = 20 + i * 3 + Math.sin(progress * Math.PI / 180) * 3;
        const alpha = 0.15 - i * 0.02;
        
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        
        if (isListening) {
          // Purple-pink for listening
          gradient.addColorStop(0, `hsla(280, 100%, 60%, ${alpha + 0.3})`);
          gradient.addColorStop(0.5, `hsla(320, 100%, 55%, ${alpha + 0.2})`);
          gradient.addColorStop(1, `hsla(240, 100%, 50%, ${alpha})`);
        } else if (isSpeaking) {
          // Blue-cyan for speaking
          gradient.addColorStop(0, `hsla(200, 100%, 60%, ${alpha + 0.3})`);
          gradient.addColorStop(0.5, `hsla(180, 100%, 55%, ${alpha + 0.2})`);
          gradient.addColorStop(1, `hsla(220, 100%, 50%, ${alpha})`);
        } else {
          // Rainbow gradient for idle active
          const hue1 = (progress) % 360;
          const hue2 = (progress + 120) % 360;
          const hue3 = (progress + 240) % 360;
          gradient.addColorStop(0, `hsla(${hue1}, 100%, 60%, ${alpha + 0.2})`);
          gradient.addColorStop(0.5, `hsla(${hue2}, 100%, 55%, ${alpha + 0.15})`);
          gradient.addColorStop(1, `hsla(${hue3}, 100%, 50%, ${alpha})`);
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
      // Idle state - subtle pulsing orb
      const pulseRadius = 18 + Math.sin(animationPhase * Math.PI / 180) * 2;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius + 10);
      gradient.addColorStop(0, 'hsla(210, 100%, 55%, 0.8)');
      gradient.addColorStop(0.6, 'hsla(260, 90%, 50%, 0.4)');
      gradient.addColorStop(1, 'hsla(210, 100%, 50%, 0.1)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add subtle ring animation
      const ringRadius = 22 + Math.sin((animationPhase + 90) * Math.PI / 180) * 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(210, 100%, 60%, ${0.2 + Math.sin(animationPhase * Math.PI / 180) * 0.1})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [animationPhase, isActive, isListening, isSpeaking, waveAmplitudes]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-16 h-16 rounded-full transition-all duration-300",
        "shadow-lg hover:shadow-xl hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        "bg-gradient-to-br from-foreground to-foreground/90",
        isActive ? "scale-110" : "",
        className
      )}
      aria-label="AI助手"
    >
      {/* Outer glow */}
      <div 
        className={cn(
          "absolute -inset-1 rounded-full blur-md transition-opacity",
          isActive || isSpeaking ? "opacity-60" : "opacity-30"
        )}
        style={{
          background: isListening 
            ? `linear-gradient(${animationPhase}deg, hsl(280, 100%, 60%), hsl(320, 100%, 50%))`
            : isSpeaking
            ? `linear-gradient(${animationPhase}deg, hsl(200, 100%, 60%), hsl(180, 100%, 50%))`
            : `linear-gradient(${animationPhase}deg, hsl(210, 100%, 55%), hsl(260, 90%, 50%))`
        }}
      />
      
      {/* Pulsing rings when active */}
      {(isActive || isSpeaking || isListening) && (
        <>
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{
              background: isListening 
                ? 'linear-gradient(135deg, hsl(280, 100%, 60%), hsl(320, 100%, 50%))'
                : isSpeaking
                ? 'linear-gradient(135deg, hsl(200, 100%, 60%), hsl(180, 100%, 50%))'
                : 'linear-gradient(135deg, hsl(210, 100%, 60%), hsl(260, 90%, 60%))'
            }}
          />
          <div 
            className="absolute -inset-2 rounded-full animate-pulse opacity-15"
            style={{
              background: `linear-gradient(${animationPhase + 180}deg, 
                hsl(210, 100%, 60%), 
                hsl(280, 100%, 60%))`
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
      
      {/* AI Icon overlay when idle */}
      {!isActive && !isListening && !isSpeaking && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg 
            className="w-6 h-6 text-white/90 drop-shadow-sm animate-pulse" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      )}
    </button>
  );
};
