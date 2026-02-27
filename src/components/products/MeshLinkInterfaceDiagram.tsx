import React from 'react';
import { Usb, Radio, Antenna, Network, Power, Monitor } from 'lucide-react';
import meshLinkPcbBg from '@/assets/products/mesh-link-pcb-bg.webp';

interface PinLabel {
  name: string;
  pins: string[];
}

const leftInterfaces: PinLabel[] = [
  { name: 'USB', pins: [] },
  { name: 'AP控制', pins: ['SCL', 'SDA', 'GND'] },
  { name: '调试串口', pins: ['RX', 'TX', 'GND'] },
  { name: '数传串口', pins: ['RX', 'TX', 'GND'] },
];

const rightInterfaces: PinLabel[] = [
  { name: 'DC座', pins: ['GND', 'VCC'] },
  { name: '网口1', pins: ['TX+', 'TX-', 'RX+', 'RX-'] },
  { name: '网口2', pins: ['TX+', 'TX-', 'RX+', 'RX-'] },
  { name: '网口3', pins: ['TX+', 'TX-', 'RX+', 'RX-'] },
];

const leftInterfacesEn: PinLabel[] = [
  { name: 'USB', pins: [] },
  { name: 'AP Control', pins: ['SCL', 'SDA', 'GND'] },
  { name: 'Debug Serial', pins: ['RX', 'TX', 'GND'] },
  { name: 'Data Serial', pins: ['RX', 'TX', 'GND'] },
];

const rightInterfacesEn: PinLabel[] = [
  { name: 'DC Jack', pins: ['GND', 'VCC'] },
  { name: 'ETH Port 1', pins: ['TX+', 'TX-', 'RX+', 'RX-'] },
  { name: 'ETH Port 2', pins: ['TX+', 'TX-', 'RX+', 'RX-'] },
  { name: 'ETH Port 3', pins: ['TX+', 'TX-', 'RX+', 'RX-'] },
];

interface MeshLinkInterfaceDiagramProps {
  lang?: 'zh' | 'en';
}

const MeshLinkInterfaceDiagram: React.FC<MeshLinkInterfaceDiagramProps> = ({ lang = 'zh' }) => {
  const left = lang === 'en' ? leftInterfacesEn : leftInterfaces;
  const right = lang === 'en' ? rightInterfacesEn : rightInterfaces;
  const mainAntenna = lang === 'en' ? 'Main Antenna' : '主天线';
  const auxAntenna = lang === 'en' ? 'Aux Antenna' : '辅天线';

  return (
    <div className="relative w-full max-w-2xl mx-auto select-none">
      {/* PCB Background */}
      <div className="relative rounded-2xl overflow-hidden border border-border/30 shadow-lg">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <img
            src={meshLinkPcbBg}
            alt="CANI MeshLink PCB board"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
        </div>

        {/* Content overlay */}
        <div className="relative p-6 md:p-10">
          {/* Top connectors - SMA + USB + DC */}
          <div className="flex justify-between items-start mb-8">
            {/* Left SMA connector */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-5 h-5 rounded-full bg-destructive border-2 border-destructive/60 shadow-md" />
              <div className="w-0.5 h-6 bg-muted-foreground/40" />
            </div>
            {/* Right SMA connector */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-5 h-5 rounded-full bg-destructive border-2 border-destructive/60 shadow-md" />
              <div className="w-0.5 h-6 bg-muted-foreground/40" />
            </div>
          </div>

          {/* Main board area */}
          <div className="relative bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-8 min-h-[320px] md:min-h-[400px]">
            {/* Center module representation */}
            <div className="absolute inset-8 md:inset-16 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 flex items-center justify-center">
              <span className="text-xs md:text-sm font-mono text-muted-foreground tracking-wider">HQL010P</span>
            </div>

            {/* Left interfaces */}
            <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-around -translate-x-1 md:-translate-x-2">
              {left.map((iface, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  {/* Pin labels */}
                  <div className="flex flex-col items-end gap-0.5 min-w-[28px] md:min-w-[36px]">
                    {iface.pins.map((pin, j) => (
                      <span key={j} className="text-[9px] md:text-[11px] font-mono text-muted-foreground leading-tight">{pin}</span>
                    ))}
                  </div>
                  {/* Connector visual */}
                  <div className="flex items-center gap-1">
                    <div className="w-3 md:w-4 h-6 md:h-8 bg-foreground/80 rounded-sm border border-foreground/40" />
                    <div className="h-px w-4 md:w-6 bg-primary/50" />
                  </div>
                  {/* Interface name */}
                  <span className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap">{iface.name}</span>
                </div>
              ))}
            </div>

            {/* Right interfaces */}
            <div className="absolute right-0 top-4 bottom-4 flex flex-col justify-around translate-x-1 md:translate-x-2">
              {right.map((iface, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3 flex-row-reverse">
                  {/* Pin labels */}
                  <div className="flex flex-col items-start gap-0.5 min-w-[28px] md:min-w-[36px]">
                    {iface.pins.map((pin, j) => (
                      <span key={j} className="text-[9px] md:text-[11px] font-mono text-muted-foreground leading-tight">{pin}</span>
                    ))}
                  </div>
                  {/* Connector visual */}
                  <div className="flex items-center gap-1 flex-row-reverse">
                    <div className={`${iface.name.includes('网口') || iface.name.includes('ETH') ? 'w-5 md:w-6 h-5 md:h-6 rounded-sm' : 'w-4 md:w-5 h-3 md:h-4 rounded-sm'} bg-foreground/70 border border-foreground/40`} />
                    <div className="h-px w-4 md:w-6 bg-primary/50" />
                  </div>
                  {/* Interface name */}
                  <span className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap">{iface.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom antenna labels */}
          <div className="flex justify-between items-center mt-6 px-4 md:px-8">
            <div className="flex items-center gap-2">
              <Antenna className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-xs md:text-sm font-medium text-foreground">{mainAntenna}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-medium text-foreground">{auxAntenna}</span>
              <Antenna className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeshLinkInterfaceDiagram;
