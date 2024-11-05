import { useRouter, useSearchParams, usePathname } from 'next/navigation';

// Define types for the return values
interface UseQueryParams {
  setQueryParam: (key: string, value?: string) => void;
  replaceQueryParams: (key: string, value?: string) => void;
}

const useQueryParams = (): UseQueryParams => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Function to handle updating query parameters
  const setParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams as URLSearchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    return params;
  };

  // Add new query
  const setQueryParam = (key: string, value?: string) => {
    const params = setParam(key, value);
    replace(`${pathname}?${params.toString()}`, { scroll: false }); // Prevents scrolling to top
  };

  // Replace the whole query with a new one
  const replaceQueryParams = (key: string, value?: string) => {
    const params = setParam(key, value);
    if (params.get(key)) {
      replace(`${pathname}?${key}=${params.get(key)}`, { scroll: false }); // Prevents scrolling to top
    } else {
      replace(`${pathname}`, { scroll: false });
    }
  };

  return { setQueryParam, replaceQueryParams };
};

export default useQueryParams;
