import { css } from '@emotion/core';
import React from 'react';
import Header from 'containers/Header';
import { colorBg, colorSecondary, fontPrimary } from 'style/theme';
import styled from '@emotion/styled';
import About from 'containers/About';
import ProjectsContainer from 'containers/ProjectsContainer';
import Contact from 'containers/Contact';
import { centerContentCollum, fillContainer } from 'style/modifiers';
import GalleryModal from 'containers/GalleryModal';

export const appContainerStyle = css`
  position: relative;
  width: 100%;

  color: ${colorSecondary};
  font-family: ${fontPrimary};

  background-color: ${colorBg};
`;

const Content = styled.div`
  ${centerContentCollum};
  flex-wrap: wrap;
`;

const App = () => (
  <>
    <Content>
      <Header />
      <About />
      <ProjectsContainer />
      <Contact />
    </Content>
    <GalleryModal />
  </>
);

export default App;
