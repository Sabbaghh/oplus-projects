'use client';
import React, { useState } from 'react';
import data from './dummyData.json';
import NavBar from '@/components/NavBar';
import Image from 'next/image';
import Title from '@/components/text/Title';
import TextRegular from '@/components/text/TextRegular';
import Marquee from 'react-fast-marquee';
import moment from 'moment';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import LightBoxNextImage from '@/components/LightboxNextImage';

function Page() {
  const { image, gallery, name, services } = data;
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Prepend the base URL to each image in the gallery
  const slides = gallery.map((url) => ({
    src: `${process.env.NEXT_PUBLIC_IMAGE_URI}/${url}`,
  }));

  // Function to handle image click
  const handleImageClick = (index: Number) => {
    setCurrentIndex(Number(index));
    setOpen(true);
  };

  return (
    <div className="bg-black">
      <NavBar inverse={true} />
      <div className="bg-black h-auto relative flex flex-col justify-center 2xl:min-h-[90vh] min-h-[95vh]">
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          render={{ slide: LightBoxNextImage }}
          index={currentIndex} // Set the current index
        />
        <div
          className={`w-full absolute h-full bg-cover bg-center`}
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URI}/${image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black -bottom-1" />
        </div>
        <section className="w-full z-10 p-10 sm:p-0 mt-20 sm:mt-40">
          <div className="w-full text-center mt-10 sm:mt-0">
            <Title
              withAnimation={true}
              text={data.name}
              size="large"
              className="text-white tracking-wide leading-none "
            />
          </div>
          <div className="container m-auto grid text-center md:grid-cols-4 md:gap-0 gap-16 sm:mt-10 mt-28 mb-32">
            <div>
              <Title
                size="medium"
                withAnimation={true}
                className="text-white tracking-wider"
                text="Client"
              />
              <TextRegular className="text-white mt-5 text-xl">
                {data.client.name}
              </TextRegular>
            </div>
            <div>
              <Title
                size="medium"
                withAnimation={true}
                className="text-white tracking-wider"
                text="Location"
              />
              <TextRegular className="text-white mt-5 text-xl">
                {data.location}
              </TextRegular>
            </div>
            <div>
              <Title
                size="medium"
                withAnimation={true}
                className="text-white tracking-wider"
                text="Pax"
              />
              <TextRegular className="text-white mt-5 text-xl">
                {data.pax}
              </TextRegular>
            </div>
            <div>
              <Title
                withAnimation={true}
                size="medium"
                className="text-white tracking-wider"
                text="Date"
              />
              <TextRegular className="text-white mt-5 text-xl">
                {moment(data.date).format('MMMM YYYY')}
              </TextRegular>
            </div>
          </div>
        </section>

        {/* Services Marquee */}
        <div className="absolute bottom-10 left-0 w-full">
          <Marquee>
            {services.map((service, index) => (
              <div key={index}>
                <TextRegular className="text-white inline-block">
                  {service.name.toUpperCase()}
                  <span className="text-white sm:mx-48 mx-10">.</span>
                </TextRegular>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Gradient Border */}
        <div className="absolute w-full bottom-0 left-0">
          <div className="absolute bottom-[-9px] left-0 w-full h-2.5 bg-gradient-to-r from-red-400 via-red-600 to-red-900 clip-custom"></div>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-black pb-96 grid grid-cols-1 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 md:px-10 lg:px-[2vw] px-5 mt-20">
        {gallery.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-96 bg-red-100 rounded-lg cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <Image
              className="object-cover transition-transform duration-300 transform sm:group-hover:scale-110 rounded-lg"
              src={`${process.env.NEXT_PUBLIC_IMAGE_URI}/${img}`}
              alt={`${name}-${index}`}
              quality={100}
              fill
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
