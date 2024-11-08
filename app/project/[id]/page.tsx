import React from 'react';
import data from './dummyData.json';
import NavBar from '@/components/NavBar';
import Image from 'next/image';
import Title from '@/components/text/Title';
import TextRegular from '@/components/text/TextRegular';
import moment from 'moment';
function page() {
  const { image } = data;
  return (
    <div className=" bg-black h-auto">
      <NavBar inverse={true} />
      <div className="w-full min-h-[70vh] bg-white relative">
        <Image
          className="object-cover fixed transition-transform duration-300 transform sm:group-hover:scale-110"
          alt={`thumbnail`}
          src={`${process.env.NEXT_PUBLIC_IMAGE_URI}/${image}`}
          quality={100}
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black -bottom-1" />
      </div>
      <section className="min-h-56 w-full absolute top-[40%]">
        <div className=" w-full text-center">
          <Title
            withAnimation={true}
            text={data.name}
            size="large"
            className="text-white tracking-wide mb-16"
          />
        </div>
        <div className="container m-auto grid text-center md:grid-cols-4 md:gap-0 gap-16 ">
          <div>
            <Title
              withAnimation={true}
              className="text-6xl text-white tracking-wider"
              text="Client"
            />
            <TextRegular className="text-white mt-5 text-xl">
              {data.client.name}
            </TextRegular>
          </div>
          <div>
            <Title
              withAnimation={true}
              className="text-6xl text-white tracking-wider"
              text="Location"
            />
            <TextRegular className="text-white mt-5 text-xl">
              {data.location}
            </TextRegular>
          </div>
          <div>
            <Title
              withAnimation={true}
              className="text-6xl text-white tracking-wider"
              text="Pax"
            />
            <TextRegular className="text-white mt-5 text-xl">
              {data.pax}
            </TextRegular>
          </div>
          <div>
            <Title
              withAnimation={true}
              className="text-6xl text-white tracking-wider"
              text="Date"
            />
            <TextRegular className="text-white mt-5 text-xl">
              {moment(data.date).format('MMMM YYYY')}
            </TextRegular>
          </div>
        </div>
      </section>
      <div className="bg-black pb-96 h-[200vh]">Hello world</div>
    </div>
  );
}

export default page;
