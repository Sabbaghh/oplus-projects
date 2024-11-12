import Image from 'next/image';
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from 'yet-another-react-lightbox';
import { useEffect, useState } from 'react';

type Slide = {
  src: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
};

type Rect = {
  width: number;
  height: number;
};

interface NextJsImageProps {
  slide: Slide;
  offset: number;
  rect: Rect;
}

function isNextJsImage(slide: any): slide is Slide {
  return isImageSlide(slide) && typeof slide.src === 'string';
}

export default function NextJsImage({ slide, offset, rect }: NextJsImageProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  const [dimensions, setDimensions] = useState({
    width: rect.width,
    height: rect.height,
  });

  useEffect(() => {
    const img = new window.Image();
    img.src = slide.src.replace(/^url\(|\)$/g, ''); // Clean URL if needed

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const width = !cover
        ? Math.min(rect.width, rect.height * aspectRatio)
        : rect.width;
      const height = !cover
        ? Math.min(rect.height, rect.width / aspectRatio)
        : rect.height;

      setDimensions({ width, height });
    };
  }, [slide.src, cover, rect.width, rect.height]);

  if (!isNextJsImage(slide)) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <Image
        fill
        alt=""
        src={slide.src.replace(/^url\(|\)$/g, '')}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? 'blur' : undefined}
        style={{
          objectFit: cover ? 'cover' : 'contain',
          cursor: click ? 'pointer' : undefined,
        }}
        sizes={`${Math.ceil((dimensions.width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
