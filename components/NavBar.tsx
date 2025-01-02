'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Title from '@/components/text/Title';
import Image from 'next/image';
import RegularText from '@/components/text/TextRegular';
import { FaFacebookF } from 'react-icons/fa6';
import { TiSocialLinkedin } from 'react-icons/ti';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

export default function StickyNav({ inverse = false }: { inverse: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: `/videos`, label: 'Videos' },
    { href: `#`, label: 'Projects' },
    {
      href: `${process.env.NEXT_PUBLIC_MAIN_WEBSITE_URI}/#services`,
      label: 'Services',
    },
    {
      href: `${process.env.NEXT_PUBLIC_MAIN_WEBSITE_URI}/about`,
      label: 'About',
    },
    {
      href: `${process.env.NEXT_PUBLIC_MAIN_WEBSITE_URI}/contact`,
      label: 'Contact',
    },
  ];

  const social = [
    { link: 'https://www.facebook.com/OPlusEvents/', icon: <FaFacebookF /> },
    { link: 'https://www.instagram.com/oplusevents/', icon: <FaInstagram /> },
    {
      link: 'https://www.linkedin.com/company/oplusevents',
      icon: <TiSocialLinkedin />,
    },
    {
      link: 'https://www.youtube.com/channel/UCbVXCKRv5sbtV5lcNSgB2IQ/videos',
      icon: <FaYoutube />,
    },
    {
      link: 'https://oplus2024.netlify.app/portfolio.pdf',
      icon: <RegularText>PORTFOLIO</RegularText>,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`absolute left-0 top-0 w-full z-50 bg-transparent `}>
        <div className="sm:px-16 px-10  py-5 flex justify-between items-center">
          <Link
            href={`${process.env.NEXT_PUBLIC_MAIN_WEBSITE_URI}`}
            className="text-xl font-bold"
          >
            <Image
              className="w-20 sm:w-32"
              src={inverse ? '/images/logo-white.png' : '/images/logo.png'}
              alt="white logo"
              width={130}
              height={130}
            />
          </Link>
          <div className="flex justify-center items-center">
            <Link
              className={inverse ? 'text-white' : 'text-black'}
              href={`${process.env.NEXT_PUBLIC_MAIN_WEBSITE_URI}/contact`}
            >
              Contact us
            </Link>
            <button onClick={toggleMenu} className="focus:outline-none ml-10">
              <Menu
                className={`h-6 w-6 ${!inverse ? 'text-black' : 'text-white'} `}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute top-0  text-white mx-auto px-10 py-5 flex justify-between items-center w-full">
          <Link
            href="https://oplus2024.netlify.app/"
            className="text-xl font-bold "
          >
            <Image
              className="w-20 sm:w-32"
              src={'/images/logo-white.png'}
              alt="white logo"
              width={120}
              height={120}
            />
          </Link>
          <button
            onClick={toggleMenu}
            className=" text-white focus:outline-none"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <ul className="space-y-6 text-center">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`transform transition-all duration-300 delay-${
                index * 100
              } ${
                isOpen
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-4 opacity-0'
              }`}
            >
              <Link
                href={item.href}
                className="text-white text-3xl hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                <Title
                  className="text-white"
                  withAnimation
                  size="large"
                  text={item.label}
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className=" px-10 absolute bottom-16 md:left-16 z-10 grid  lg:w-[30vw] md:w-[50vw] sm:w-full w-full ">
          <div className="text-white text-2xl grid grid-cols-5 ">
            {social.map((el, index) => (
              <Link target="_blank" key={index} href={el.link}>
                {el.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
