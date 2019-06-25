import React, { useState } from 'react';
import styled from '@emotion/styled';
import SectionHeader from 'components/SectionHeader';
import projects from 'config/projects';
import Project from 'components/Project';
import GalleryModal from 'components/Gallery';

const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1400px;
`;

const Projects = () => (
  <>
    <SectionHeader name="Principais Projetos" />
    <Container id="projetos">
      {projects.map((project, i) => (
        <Project pos={i} key={i} {...project} />
      ))}
    </Container>
  </>
);

export default Projects;
