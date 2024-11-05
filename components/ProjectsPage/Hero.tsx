import React from 'react';
import Title from '@/components/text/Title';
import TextRegular from '@/components/text/TextRegular';

function Hero() {
  return (
    <section className="container m-auto flex flex-col h-[50vh] justify-center mb-40 px-12 ">
      <Title
        text="Projects"
        withAnimation
        size="x-large"
        className="text-center"
      />
      <TextRegular size="medium" className="text-center text-gray-500">
        A look at some of our previous Local & International projects &
        experiences for both Government & Private clients.
      </TextRegular>
    </section>
  );
}

export default Hero;
