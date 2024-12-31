import React from 'react';
import Title from '@/components/text/Title';
import TextRegular from '@/components/text/TextRegular';
import Marquee from 'react-fast-marquee';

interface props {
  image: string;
  projectName: string;
  services: string[];
  clientName: string;
  location: string;
  pax: string;
  date: string;
}
function Header(props: props) {
  const { image, projectName, services, clientName, location, pax, date } =
    props;
  const stats = [
    {
      title: 'Client',
      data: clientName,
    },
    {
      title: 'location',
      data: location,
    },
    {
      title: 'pax',
      data: pax,
    },
    {
      title: 'date',
      data: date,
    },
  ];
  return (
    <div className="bg-black h-auto relative flex flex-col justify-center 2xl:min-h-[90vh] min-h-[95vh]">
      <div
        className={`w-full absolute h-full bg-cover bg-center`}
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URI}/${image})`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black -bottom-1" />
      </div>
      <section className="w-full z-10 p-10 sm:p-0 mt-20 sm:mt-40">
        <div className="w-full text-center mt-10 sm:mt-0 max-w-[80vw] m-auto">
          <TextRegular
            size="large"
            className="text-white mt-5 font-normal capitalize"
          >
            {projectName}
          </TextRegular>
        </div>
        <div
          className={`container m-auto grid text-center ${
            pax ? 'md:grid-cols-4' : 'md:grid-cols-3'
          } md:gap-0 gap-16 sm:mt-10 mt-28 mb-32`}
        >
          {stats.map(({ title, data }, index) => {
            return (
              <React.Fragment key={index}>
                {data ? (
                  <div>
                    <TextRegular
                      size="medium-large"
                      className="text-white mt-5 font-normal capitalize"
                    >
                      {title}
                    </TextRegular>
                    <TextRegular className="text-white text-xl font-light">
                      {data}
                    </TextRegular>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Services Marquee */}
      <div className="absolute bottom-10 left-0 w-full">
        <Marquee
          speed={100}
          pauseOnHover
          pauseOnClick
          className="overflow-hidden"
        >
          {services.map((service, index) => (
            <div key={index}>
              <TextRegular className="text-white inline-block">
                {service.toUpperCase()}
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
  );
}

export default Header;
