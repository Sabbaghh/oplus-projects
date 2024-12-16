'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import SkeletonCard from '@/components/ProjectsPage/SkeletonCard';
import { useSearchParams } from 'next/navigation';
import TextRegular from '@/components/text/TextRegular';
import moment from 'moment';
import Link from 'next/link';
import useProjects from '@/components/hooks/useProjectsApi';

const ItemList: React.FC = () => {
  const searchParams = useSearchParams();
  const projectType = searchParams.get('projectType');
  const searchValue = searchParams.get('search');

  // Use the custom hook to fetch projects
  const { data, loading, hasMore, setPage } = useProjects(
    projectType,
    searchValue,
  );

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      <section className="sm:px-20 px-5 grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-10 gap-16 mb-12 min-h-96">
        {loading && data.length === 0 ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <SkeletonCard />
            </div>
          ))
        ) : data.length > 0 ? (
          data.map(({ id, name, image, type, date }, index) => (
            <Link
              href={`/project/${id}`}
              key={`${id}-${index}-${Math.random()}`}
              className="cursor-pointer"
            >
              <div className="w-full aspect-video relative rounded-md overflow-hidden group">
                <Image
                  className="object-cover transition-transform duration-300 transform sm:group-hover:scale-110"
                  alt={`${name} thumbnail`}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URI}/${image}`}
                  quality={100}
                  fill
                  sizes="100vw"
                />
                <div className="px-2 py-1 top-3 left-3 rounded-md absolute bg-black/50">
                  <TextRegular size="small" className="text-white">
                    {moment(date).format('MMM, YYYY').toUpperCase()}
                  </TextRegular>
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <TextRegular className="font-extrabold text-xl w-3/4 line-clamp-2">
                  {name}
                </TextRegular>
                <TextRegular
                  size="small"
                  className="font-extrabold opacity-80 self-center w-1/4 text-end "
                >
                  {type.name}
                </TextRegular>
              </div>
            </Link>
          ))
        ) : (
          <p>No results found</p>
        )}
      </section>
      <section className="min-h-96">
        {loading && data.length > 0 && (
          <div className=" px-20 grid xlg:grid-cols-3 md:grid-cols-3 grid-cols-1 sm:gap-16 gap-16 mb-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        )}
        {!hasMore && !loading && data.length > 0 && (
          <p className="text-center">No more projects to load.</p>
        )}
      </section>
    </>
  );
};

export default ItemList;
