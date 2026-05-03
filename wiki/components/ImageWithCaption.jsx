import Image from 'next/image';

export default function ImageWithCaption({ src, alt, caption }) {
  return (
    <figure className="my-8 border border-border-primary rounded-xl p-3 bg-sidebar flex flex-col items-center shadow-sm">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-white dark:bg-slate-900 ring-1 ring-border-primary">
        {/* Next.js Image with unoptimized=true for local static PNGs */}
        <Image 
          src={src} 
          alt={alt} 
          width={1200} 
          height={800} 
          className="w-full h-auto object-contain transition-transform hover:scale-[1.02] duration-300"
          unoptimized={true}
        />
      </div>
      <figcaption className="mt-4 text-xs font-medium tracking-tight text-center text-foreground/60 px-6 uppercase">
        {caption}
      </figcaption>
    </figure>
  );
}
