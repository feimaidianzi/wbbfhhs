import { useState } from "react";
import { X } from "lucide-react";

import smtWorkshop from "@/assets/about/smt-workshop.jpg";
import rdOffice from "@/assets/about/rd-office.jpeg";
import warehouse from "@/assets/about/warehouse.jpg";
import teamPhoto from "@/assets/about/team-photo.png";
import cncWorkshop from "@/assets/about/cnc-workshop.jpg";
import assemblyWorkshop from "@/assets/about/assembly-workshop.jpg";
import aoiInspection from "@/assets/about/aoi-inspection.jpg";
import officeBuilding from "@/assets/about/office-building.png";

interface FacilityGalleryProps {
  t: (key: string) => string;
}

const facilities = [
  { src: officeBuilding, zhLabel: "公司大楼", enLabel: "Company Building" },
  { src: smtWorkshop, zhLabel: "SMT车间", enLabel: "SMT Workshop" },
  { src: rdOffice, zhLabel: "研发办公室", enLabel: "R&D Office" },
  { src: warehouse, zhLabel: "仓库", enLabel: "Warehouse" },
  { src: teamPhoto, zhLabel: "员工合照", enLabel: "Team Photo" },
  { src: cncWorkshop, zhLabel: "CNC车间", enLabel: "CNC Workshop" },
  { src: assemblyWorkshop, zhLabel: "组装车间", enLabel: "Assembly Workshop" },
  { src: aoiInspection, zhLabel: "AOI光学检测", enLabel: "AOI Optical Inspection" },
];

export const FacilityGallery = ({ t }: FacilityGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          {t('about.facilities.title') !== 'about.facilities.title' ? t('about.facilities.title') : '生产研发实力'}
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          {t('about.facilities.desc') !== 'about.facilities.desc' ? t('about.facilities.desc') : '从SMT贴片到CNC加工，从研发设计到成品组装，全链条自主可控'}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {facilities.map((item, index) => (
            <button
              key={index}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <img
                src={item.src}
                alt={`${item.enLabel} - ${item.zhLabel}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-0 left-0 right-0 px-3 py-2 text-sm font-medium text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/70 to-transparent">
                {item.zhLabel}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={facilities[lightboxIndex].src}
            alt={facilities[lightboxIndex].enLabel}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-full">
            {facilities[lightboxIndex].zhLabel}
          </p>
        </div>
      )}
    </section>
  );
};
