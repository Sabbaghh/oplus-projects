'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import NavBar from '@/components/NavBar';
import LightboxComponent from '@/components/Lightbox';
import Header from '@/components/ProjectPage/Header';
import moment from 'moment';
import Gallery from '@/components/ProjectPage/Gallery';
import useProject from '@/components/hooks/useProject';

function Page() {
  const { id } = useParams();

  const {
    data: projectData,
    loading,
    error,
  } = id
    ? useProject(id.toString())
    : { loading: true, error: false, data: {} };

  // State for handling lightbox
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle image click for the lightbox
  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  // Null check for projectData
  if (!projectData) {
    return null; // Render nothing if projectData is null
  }

  // Destructuring with default values
  const { image, gallery, name, services, date, client, location, pax } =
    projectData;

  return (
    <div className="bg-black min-h-[100vh]">
      <NavBar inverse={true} />
      {!loading ? (
        <>
          <LightboxComponent
            gallery={gallery}
            open={open}
            setOpen={setOpen}
            currentIndex={currentIndex}
          />
          <Header
            image={image}
            projectName={name}
            services={services.map((service: { name: string }) => service.name)} // Map over services to display them
            clientName={client.name} // Use optional chaining
            location={location}
            pax={pax ? pax.toString() : null}
            date={moment(date).format('MMM yy')} // Format date
          />
          <Gallery gallery={gallery} handleImageClick={handleImageClick} />
        </>
      ) : (
        <div className="loader bg-black">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      )}
    </div>
  );
}

export default Page;
