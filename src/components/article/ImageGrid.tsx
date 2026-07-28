import Image from "next/image";

interface ImageGridImage {
  src: string;
  alt: string;
}

interface ImageGridProps {
  images: ImageGridImage[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <div
      className="my-8 flex flex-col md:flex-row gap-4"
      id="image-grid"
    >
      {images.map((img, index) => (
        <div
          key={index}
          className="flex-1 relative aspect-[4/3] rounded-xl overflow-hidden"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
