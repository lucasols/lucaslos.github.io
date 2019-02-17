import styled from '@emotion/styled';
import PageHeader from 'components/PageHeader';
import Project from 'components/Project';
import Steeper from 'components/Steeper';
import projects from 'config/projects';
import React, { CSSProperties } from 'react';
import { animated } from 'react-spring';
import { centerContent, fillContainer } from 'style/modifiers';
import { PosProp, useGetStyles } from 'utils/spaceScroll';

const Container = styled.section`
  ${fillContainer};
  ${centerContent};

  padding: 0 32px;
`;

const Content = styled.div`
  ${centerContent};
  width: 1000px;
  height: 500px;

  .steeper {
    position: absolute;
    right: 0;
  }
`;

const ProjectsContainer = styled(animated.div)`
  position: absolute;
  height: 100%;
  left: 0;
  right: 40px;
`;

const disableInteractivity: CSSProperties = {
  pointerEvents: 'none',
};

const Projects = ({ springProps, active }: PosProp) => {
  const styles = useGetStyles('projects', 2, springProps);

  return (
    <Container style={active ? undefined : disableInteractivity}>
      <PageHeader section="Projects" style={styles[1]()} />
      <Content>
        <ProjectsContainer style={styles[2]()}>
          {projects.map((project, i) => (
            <Project key={i} {...project} />
          ))}
        </ProjectsContainer>
        <Steeper
          items={[
            { id: 1, label: 'test' },
            ...projects.map((project, id) => ({ id, label: project.title })),
          ]}
          activeId={0}
          onClickItem={id => alert(id)}
          style={styles[2]()}
        />
      </Content>
    </Container>
  );
};

export default Projects;
