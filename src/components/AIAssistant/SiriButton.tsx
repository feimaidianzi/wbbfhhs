import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (isActive || isSpeaking) {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isActive, isSpeaking]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-14 h-14 rounded-full transition-all duration-300 overflow-hidden",
        "shadow-lg hover:shadow-xl hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        isActive ? "scale-110" : "",
        className
      )}
      aria-label="AI助手"
    >
      {/* Animated gradient background */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-80"
        )}
        style={{
          background: isActive 
            ? `linear-gradient(${animationPhase}deg, 
                hsl(210, 100%, 50%), 
                hsl(280, 100%, 60%), 
                hsl(330, 100%, 50%), 
                hsl(210, 100%, 50%))`
            : `linear-gradient(135deg, 
                hsl(var(--primary)), 
                hsl(var(--accent)))`
        }}
      />
      
      {/* Pulsing rings when active */}
      {isActive && (
        <>
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{
              background: `linear-gradient(${animationPhase + 90}deg, 
                hsl(210, 100%, 60%), 
                hsl(280, 100%, 70%))`
            }}
          />
          <div 
            className="absolute -inset-1 rounded-full animate-pulse opacity-20"
            style={{
              background: `linear-gradient(${animationPhase + 180}deg, 
                hsl(330, 100%, 60%), 
                hsl(210, 100%, 60%))`
            }}
          />
        </>
      )}

      {/* Listening indicator waves */}
      {isListening && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute w-2 bg-white/80 rounded-full"
              style={{
                height: `${Math.sin((animationPhase + i * 30) * Math.PI / 180) * 10 + 15}px`,
                left: `${50 + (i - 1) * 8}%`,
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>
      )}

      {/* Speaking indicator */}
      {isSpeaking && !isListening && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute w-1.5 bg-white/90 rounded-full transition-all"
              style={{
                height: `${Math.sin((animationPhase * 2 + i * 40) * Math.PI / 180) * 8 + 10}px`,
                left: `${30 + i * 10}%`,
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>
      )}

      {/* Default icon when not active */}
      {!isActive && !isListening && !isSpeaking && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className="w-7 h-7 text-white drop-shadow-sm" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      )}

      {/* Glow effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full blur-md -z-10 transition-opacity",
          isActive ? "opacity-60" : "opacity-30"
        )}
        style={{
          background: isActive 
            ? `linear-gradient(${animationPhase}deg, 
                hsl(210, 100%, 50%), 
                hsl(280, 100%, 60%))`
            : "hsl(var(--primary))"
        }}
      />
    </button>
  );
};
