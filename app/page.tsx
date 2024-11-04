import Hero from '@/components/ProjectsPage/Hero';
import ItemList from '@/components/ProjectsPage/ItemList';
import Filters from '@/components/ProjectsPage/Filters';
import { Suspense } from 'react';
export default async function Home() {
  return (
    <>
      <Hero />
      <Filters />
      <Suspense fallback={<>loading..</>}>
        <ItemList />
      </Suspense>
    </>
  );
}
