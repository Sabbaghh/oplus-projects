import Hero from '@/components/ProjectsPage/Hero';
import ItemList from '@/components/ProjectsPage/ItemList';
import Filters from '@/components/ProjectsPage/Filters';

export default async function Home(props: {
  searchParams?: Promise<{
    type?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <Hero />
      <Filters />
      <ItemList query={searchParams} />
    </>
  );
}
