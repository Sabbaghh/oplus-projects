'use client';
import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import LightBoxNextImage from '@/components/LightboxNextImage';
import 'yet-another-react-lightbox/styles.css';
interface LightboxProps {
  gallery: string[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
}
const LightboxComponent = (props: LightboxProps) => {
  const { gallery, open, setOpen, currentIndex } = props;
  // Prepare slides for Lightbox
  const slides = gallery.map((url) => ({
    src: `${process.env.NEXT_PUBLIC_IMAGE_URI}/${url}`,
  }));

  return (
    <>
      {/* Lightbox UI */}
      <Lightbox
        open={open}
        close={() => setOpen(false)} // Close the lightbox
        slides={slides}
        render={{ slide: LightBoxNextImage }}
        index={currentIndex}
      />
    </>
  );
};

export default LightboxComponent;
