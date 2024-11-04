import Hero from '@/components/ProjectsPage/Hero';
import ItemList from '@/components/ProjectsPage/ItemList';
import Filters from '@/components/ProjectsPage/Filters';

export default async function Home() {
  return (
    <>
      <Hero />
      <Filters />
      <ItemList />
    </>
  );
}
