'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Title from '@/components/text/Title';
import Image from 'next/image';

export default function StickyNav() {
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
      <nav className="sticky top-0 z-40 bg-white pt-5">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            <Image
              src={'/images/logo.png'}
              alt="white logo"
              width={100}
              height={100}
            />
          </Link>
          <button onClick={toggleMenu} className="focus:outline-none">
            <Menu className="h-6 w-6" />
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
        <div className="container absolute top-6  text-white mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold ">
            <Image
              src={'/images/logo-white.png'}
              alt="white logo"
              width={100}
              height={100}
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
