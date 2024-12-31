import React from 'react';
import Title from '@/components/text/Title';
import TextRegular from '@/components/text/TextRegular';
import NavBar from '@/components/NavBar';
interface props {
  title?: string;
  desc?: string;
}
function Hero(props: props) {
  const { title, desc } = props;
  return (
    <section className=" sm:min-h-[90vh] min-h-[50vh]  sm:p-0 p-2 flex flex-col  justify-center mb-10 mt-24 sm:mt-0">
      <Title
        text={title || 'Projects'}
        withAnimation
        size="x-large"
        className="text-center"
      />
      <TextRegular size="medium" className="text-center text-gray-500">
        {desc ||
          `A look at some of our previous Local & International projects &
        experiences for both Government & Private clients.`}
      </TextRegular>
    </section>
  );
}

export default Hero;
