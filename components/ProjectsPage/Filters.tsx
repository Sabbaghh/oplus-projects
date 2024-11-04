'use client';

import React from 'react';
import Tabs from '@/components/Tabs';
import SearchBar from '@/components/ProjectsPage/SearchBar';

function Filters() {
  return (
    <nav className="grid sm:grid-cols-12 gap-5 container m-auto px-5 mb-12">
      <SearchBar />
      <div className="md:col-span-6 sm:col-span-12 gap-5 flex sm:justify-end justify-center">
        <Tabs />
      </div>
    </nav>
  );
}

export default Filters;
