import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import axios from 'axios';

const useProjects = (
  projectType: string | null,
  searchValue: string | null,
) => {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = async (pageNum: number, resetData = false) => {
    console.log('useprojects trigger');
    setLoading(true);
    try {
      let url: string;

      if (projectType) {
        url = `${process.env.NEXT_PUBLIC_API_URI}/projects?type=${projectType}&page=${pageNum}`;
      } else if (searchValue) {
        url = `${process.env.NEXT_PUBLIC_API_URI}/projects/search?q=${searchValue}&page=${pageNum}`;
      } else {
        url = `${process.env.NEXT_PUBLIC_API_URI}/projects?page=${pageNum}`;
      }

      const { data: fetchedData } = await axios.get(url);

      // Reset data if required
      setData((prevData) =>
        resetData ? fetchedData.data : [...prevData, ...fetchedData.data],
      );
      setHasMore(!!fetchedData.next_page_url);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch new data when projectType or searchValue changes
  useEffect(() => {
    setData([]); // Clear existing data
    setPage(1); // Reset to first page
    setHasMore(true); // Reset hasMore flag
    fetchData(1, true); // Fetch data with reset flag
  }, [projectType, searchValue]);

  // Fetch additional data when page changes
  useEffect(() => {
    if (page > 1) fetchData(page);
  }, [page]);

  return {
    data,
    loading,
    hasMore,
    setPage,
  };
};

export default useProjects;
