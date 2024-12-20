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
        return '2xl:text-7xl  sm:text-5xl text-5xl  leading-[0.5em]';
      case 'large':
        return '2xl:text-9xl md:text-8xl sm:text-7xl text-5xl leading-[0.5em]';
      case 'x-large':
        return '2xl:text-[20rem] md:text-[15rem] sm:text-[15rem] text-[10em]';
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
            <div className="mr-2 ml-2 inline bg-red"></div>
          ) : null}
        </React.Fragment>
      ))}
    </h1>
  );
}

export default Title;
