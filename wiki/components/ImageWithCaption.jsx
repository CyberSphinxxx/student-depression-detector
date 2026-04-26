import Image from 'next/image';

export default function ImageWithCaption({ src, alt, caption }) {
  return (
    <figure className="my-6 border border-gray-200 rounded-lg p-2 bg-gray-50 flex flex-col items-center">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-md bg-white">
        {/* Next.js Image with unoptimized=true for local static PNGs */}
        <Image 
          src={src} 
          alt={alt} 
          width={800} 
          height={600} 
          className="w-full h-auto object-contain"
          unoptimized={true}
        />
      </div>
      <figcaption className="mt-3 text-sm text-center text-gray-600 px-4">
        {caption}
      </figcaption>
    </figure>
  );
}
