import { Carousel } from "@material-tailwind/react";

type GalleryProps = {
  images: string[];
};

export function Gallery({ images }: GalleryProps) {
  return (
    <Carousel className="rounded-xl flex ">
      {images.map((image, index) => (
        <img src={image} key={index} className=" object-cover" />
      ))}
    </Carousel>
  );
}
