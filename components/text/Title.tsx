import React from 'react';

type Props = {
  text: string;
  size?: 'small' | 'medium' | 'large' | 'x-large';
  withAnimation?: boolean;
  className?: string;
};

function Title(props: Props) {
  const {
    text,
    size = 'medium',
    withAnimation = false,
    className = '',
  } = props;

  // Determine font size based on prop size
  const fontSize = (): string => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'lg:text-6xl md:text-[3rem] sm:text-[2rem] text-[1em] leading-[0.5em]';
      case 'large':
        return 'lg:text-9xl md:text-[5rem] sm:text-[4rem] text-[5em] leading-[0.5em]';
      case 'x-large':
        return 'xl:text-[20rem] md:text-[15rem] sm:text-[15rem] text-[10em]';
      default:
        return 'text-6xl';
    }
  };

  const animation = withAnimation ? 'custom-scale' : '';

  return (
    <h1
      className={`${className} font-[family-name:var(--six-caps)] text-black`}
    >
      {text.split(' ').map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className={`inline-block uppercase ${fontSize()} ${animation} ${className}`}
              >
                {char}
              </span>
            ))}
          </span>

          {text.split(' ').length > wordIndex + 1 ? (
            <div className="mr-5 h-6 inline bg-red"></div>
          ) : null}
        </React.Fragment>
      ))}
    </h1>
  );
}

export default Title;
