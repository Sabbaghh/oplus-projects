import Hero from '@/components/ProjectsPage/Hero';
import ItemList from '@/components/ProjectsPage/ItemList';
import Filters from '@/components/ProjectsPage/Filters';
import { Suspense } from 'react';
import NavBar from '@/components/NavBar';
export default async function Home(props: {
  searchParams?: Promise<{
    type?: string;
    page?: string;
  }>;
}) {
  return (
    <>
      <NavBar inverse={false} />
      <Hero />
      <Suspense>
        <Filters />
        <ItemList />
      </Suspense>
    </>
  );
}
