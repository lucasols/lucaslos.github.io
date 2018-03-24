import React from 'react'; import PropTypes from 'prop-types'; 
import Projects from 'components/Projects';
import ProjectsNav from 'components/ProjectsNav';

const Works = () => (
  <section id="works">
    <div className="logo" data-anim="1" />
    <h1 className="section-title" data-anim="1" >WORKS</h1>
    <article>
      <Projects />
      <ProjectsNav />
    </article>
  </section>
);

export default Works;
