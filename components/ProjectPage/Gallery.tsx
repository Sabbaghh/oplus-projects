import React from 'react';
import Image from 'next/image';

interface props {
  gallery: string[];
  handleImageClick: (index: number) => void;
}
function Gallery(props: props) {
  const { gallery, handleImageClick } = props;
  return (
    <div className="bg-black grid grid-cols-1 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 md:px-10 lg:px-[2vw] px-5 mt-20 pb-32">
      {gallery.map((img, index) => (
        <div
          key={index}
          className="relative w-full aspect-video rounded-lg cursor-pointer"
          onClick={() => handleImageClick(index)}
        >
          <Image
            className="object-cover  transition-transform duration-300 transform sm:group-hover:scale-110 rounded-lg"
            src={`${process.env.NEXT_PUBLIC_IMAGE_URI}/${img}`}
            alt={`${name}-${index}`}
            quality={100}
            fill
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}

export default Gallery;
