import Image from 'next/image';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

export default function ImageWithCaption({ src, alt, caption }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <figure 
        className="my-8 border border-border-primary rounded-xl p-3 bg-sidebar flex flex-col items-center shadow-sm cursor-pointer hover:border-accent/50 transition-colors group"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-white dark:bg-slate-900 ring-1 ring-border-primary">
          <div className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm">
            <ZoomIn className="w-4 h-4" />
          </div>
          {/* Next.js Image with unoptimized=true for local static PNGs */}
          <Image 
            src={src} 
            alt={alt} 
            width={1200} 
            height={800} 
            className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02] duration-300"
            unoptimized={true}
          />
        </div>
        <figcaption className="mt-4 text-xs font-medium tracking-tight text-center text-foreground/60 px-6 uppercase flex flex-col items-center gap-1">
          {caption}
          <span className="text-[10px] bg-foreground/5 text-foreground/50 px-2 py-0.5 rounded-full normal-case font-semibold">Click to enlarge</span>
        </figcaption>
      </figure>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative max-w-7xl w-full flex flex-col items-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          >
            <button 
              className="absolute -top-12 right-0 text-white/70 hover:text-white p-2 transition-colors bg-white/10 hover:bg-white/20 rounded-full"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full flex justify-center bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-white/20 shadow-2xl">
              <Image 
                src={src} 
                alt={alt} 
                width={1920} 
                height={1080} 
                className="w-auto h-auto max-h-[80vh] object-contain"
                unoptimized={true}
              />
            </div>
            {caption && (
              <div className="text-white/90 mt-4 text-sm font-medium bg-black/50 px-5 py-2.5 rounded-full border border-white/10 shadow-lg text-center max-w-3xl">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
