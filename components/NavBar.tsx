'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Title from '@/components/text/Title';
import Image from 'next/image';

export default function StickyNav({ inverse = false }: { inverse: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'About' },
    { href: '#', label: 'Services' },
    { href: '#', label: 'Contact' },
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
      <nav className={`fixed left-0 top-0 w-full z-50 bg-transparent`}>
        <div className="px-16 py-10 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            <Image
              src={inverse ? '/images/logo-white.png' : '/images/logo.png'}
              alt="white logo"
              width={130}
              height={130}
            />
          </Link>
          <button onClick={toggleMenu} className="focus:outline-none">
            <Menu
              className={`h-6 w-6 ${!inverse ? 'text-black' : 'text-white'} `}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className=" absolute top-6  text-white mx-auto px-16 py-10 flex justify-between items-center w-full">
          <Link href="/" className="text-xl font-bold ">
            <Image
              src={!inverse ? '/images/logo-white.png' : '/images/logo.png'}
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
      </div>
    </>
  );
}
