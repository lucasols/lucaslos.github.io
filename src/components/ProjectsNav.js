import React from 'react'; import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import * as actions from 'redux/actions/index';
import spaceScroll from 'utils/spaceScroll';

class ProjectsNav extends React.Component {
  setActiveProject(projectId) {
    this.props.setActiveProject(projectId);
    spaceScroll.scrollToProject(projectId);
  }

  render() {
    const { projects, activeProject } = this.props;

    return (
      <nav className="projects-nav" data-anim="2">
        {projects.map((project, i) =>
          <div
            key={i}
            className={`nav-item ${activeProject === i ? 'active' : ''}`}
            onClick={() => this.setActiveProject(i)}
          >
            <div className="inner"><span>{project.title}</span></div>
          </div>
        )}
        <div className="nav-item" onClick={() => spaceScroll.scrollToSection(3)}><div className="inner"><span>Add your project here!</span></div></div>
      </nav>
    );
  }
}

ProjectsNav.propTypes = {
  setActiveProject: PropTypes.func.isRequired,
  activeProject: PropTypes.number.isRequired,
  projects: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
  ])).isRequired,
};

const mapStateToProps = state => ({
  activeProject: state.projects.active,
  projects: state.projects.data,
});

const mapDispatchToProps = dispatch => ({
  setActiveProject: projectId => dispatch(actions.setActiveProject(projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsNav);
