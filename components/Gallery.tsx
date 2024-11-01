import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

type GalleryProps = {
  images: string[];
};

export function Gallery({ images }: GalleryProps) {
  return (
    <Carousel className="rounded-xl flex">
      {images.map((image, index) => (
        <Image
          src={image}
          alt=""
          key={index}
          className="object-cover"
          width={400}
          height={600}
        />
      ))}
    </Carousel>
  );
}
