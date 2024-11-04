'use client';
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import useQueryParams from '@/components/ProjectsPage/useQueryParams';
function SearchBar() {
  const { replaceQueryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    // Set a timer to trigger the search query after 1 second of no typing
    const timeoutId = setTimeout(() => {
      replaceQueryParams('search', term);
    }, 300);

    // Clear the timeout if the user types again before 1 second
    return () => clearTimeout(timeoutId);
  }, [term]);

  function handleSearch(term: string) {
    setTerm(term);
  }
  return (
    <div className="relative w-full sm:w-[60%] md:col-span-6 sm:col-span-12">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search"
        className="pl-8 font-[family-name:var(--poppins)]"
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  );
}

export default SearchBar;
