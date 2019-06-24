import Gallery from 'components/Gallery';
import projects from 'config/projects';
import React from 'react';
import galleryModalState from 'state/galleryState';

const GalleryModal = () => {
  const [activePos, setActivePos] = galleryModalState.useStore('activePos');
  const [isOpen, setIsOpen] = galleryModalState.useStore('isOpen');
  const [activeProject] = galleryModalState.useStore('activeProject');

  function increasePos() {
    if (activePos !== projects[activeProject].imgs.length - 1) {
      setActivePos(activePos + 1);
    }
  }

  function decreasePos() {
    if (activePos !== 0) {
      setActivePos(activePos - 1);
    }
  }

  return (
    <Gallery
      images={projects[activeProject].imgs}
      activePos={activePos}
      projectId={activeProject}
      title={projects[activeProject].title}
      isOpen={isOpen}
      decreasePos={decreasePos}
      increasePos={increasePos}
      closeModal={() => setIsOpen(false)}
    />
  );
};

export default GalleryModal;
