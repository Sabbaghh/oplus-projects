import Hero from '@/components/ProjectsPage/Hero';
import Link from 'next/link';
import TextRegular from '@/components/text/TextRegular';
import NavBar from '@/components/NavBar';
import YoutubeData from './youtube.json';
import moment from 'moment';

function Videos() {
  // Filter to include only "kind": "youtube#video"
  const filteredItems = YoutubeData.items.filter(
    (item) => item.id.kind === 'youtube#video',
  );

  return (
    <>
      <NavBar inverse={false} />
      <Hero title="Videos" />
      <section className="sm:px-20 px-5 grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-10 gap-16 mb-12 min-h-96">
        {filteredItems.map((item, index) => (
          <Link
            href={`/project/${index}`}
            key={`${index}-${index}`}
            className="cursor-pointer"
          >
            <div className="w-full aspect-video relative rounded-md overflow-hidden group">
              <iframe
                className="w-full h-full rounded-md"
                src={`https://www.youtube.com/embed/${item.id.videoId}`}
                title={`${item.snippet.title} video player`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-between mt-5">
              <TextRegular className="font-extrabold text-xl w-3/4 line-clamp-2">
                {item.snippet.title}
              </TextRegular>
              <TextRegular
                size="small"
                className="font-extrabold opacity-80 self-center w-1/4 text-end "
              >
                video
              </TextRegular>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

export default Videos;
