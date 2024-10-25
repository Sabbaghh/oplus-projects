'use client';
import React from 'react';
import SkeletonCard from '@/components/ProjectsPage/SkeletonCard';
function ItemList({ query }: any) {
  console.log(query);
  return (
    <section className="container m-auto px-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-5 gap-16">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </section>
  );
}

export default ItemList;
