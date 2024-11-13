'use client';
import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import axios from 'axios';

const useProject = (projectId: string | null) => {
  const [data, setData] = useState<Project | any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | string | null>(false);

  const fetchProject = async () => {
    console.log('useproject trigger');
    if (!projectId) return; // If no projectId is provided, skip fetching

    setLoading(true);
    setError(false); // Reset error on each fetch

    try {
      const { data: fetchedData } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URI}/project/${projectId}`,
      );
      setData(fetchedData); // Assuming the API returns a project object directly
    } catch (err) {
      setError('Error fetching project details');
      console.error('Error fetching project:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  return {
    data,
    loading,
    error,
  };
};

export default useProject;
