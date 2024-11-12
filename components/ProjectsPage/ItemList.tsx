'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SkeletonCard from '@/components/ProjectsPage/SkeletonCard';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import TextRegular from '@/components/text/TextRegular';
import moment from 'moment';
import Link from 'next/link';

interface ProjectType {
  name: string;
}

interface Project {
  id: number;
  name: string;
  image: string;
  type: ProjectType;
  date: string;
}

interface ApiResponse {
  data: Project[];
  next_page_url?: string | null;
}

const ItemList: React.FC = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const projectType = searchParams.get('projectType');
  const searchValue = searchParams.get('search');

  const fetchData = async (pageNum: number) => {
    setLoading(true);
    try {
      let url: string;

      if (projectType) {
        // If projectType exists, call the type-specific endpoint
        url = `${process.env.NEXT_PUBLIC_API_URI}/projects?type=${projectType}&page=${pageNum}`;
      } else if (searchValue) {
        // If searchValue exists, call the search endpoint
        url = `${process.env.NEXT_PUBLIC_API_URI}/projects/search?q=${searchValue}&page=${pageNum}`;
      } else {
        // Default endpoint for all projects
        url = `${process.env.NEXT_PUBLIC_API_URI}/projects?page=${pageNum}`;
      }

      const { data: fetchedData } = await axios.get(url);
      setData((prevData) => [...prevData, ...fetchedData.data]);
      setHasMore(!!fetchedData.next_page_url);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([]); // Reset data when parameters change
    setPage(1); // Reset to first page
    setHasMore(true); // Reset "has more" state
    fetchData(1); // Fetch initial data
  }, [projectType, searchValue]);

  useEffect(() => {
    if (page > 1) fetchData(page);
  }, [page]);

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
      <section className=" sm:px-20 px-5 grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-20 gap-16 mb-12  min-h-96">
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
              <div className="w-full h-96 relative rounded-md overflow-hidden group">
                <Image
                  className="object-cover transition-transform duration-300 transform sm:group-hover:scale-110"
                  alt={`${name} thumbnail`}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URI}/${image}`}
                  quality={100}
                  fill
                  sizes="100vw"
                />
                <div className="px-2 py-1 top-3 left-3 rounded-md absolute bg-white/20">
                  <TextRegular size="x-small" className="text-white">
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
          <div className=" px-20 grid xlg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-16 gap-16 mb-12">
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
