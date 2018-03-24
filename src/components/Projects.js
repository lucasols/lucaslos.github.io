import React from 'react'; import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import * as actions from 'redux/actions/index';
import spaceScroll from 'utils/spaceScroll';
import classNames from 'classnames';

class Projects extends React.Component {
  setActiveProject(projectId) {
    this.props.setActiveProject(projectId);
    spaceScroll.scrollToProject(projectId);
  }

  render() {
    const { projects, activeProject } = this.props;

    return (
      <div className="projects-wrapper" data-anim="2">
        {projects.map((project, i) =>
          <div
            key={i}
            className={classNames(
              { active: i === activeProject },
              { front: i > activeProject },
              { back: i < activeProject },
            )}
          >
            <div className="project-image" style={{ backgroundImage: `url(${project.backgroundImage})` }} />
            <div className="project-info">
              <h3>{project.tags}</h3>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <a href={project.link} className="button small">VISIT</a>
              {project.caseStudy !== false &&
                <a href={projects.caseStudy} className="button small">CASE STUDY</a>
              }
            </div>

            {i !== 0 &&
              <div className="prev-slide-button" onClick={() => this.setActiveProject(i - 1)}>
                <div className="preview-slide"><span>{projects[i - 1].title}</span></div>
                <svg width="24" viewBox="0 0 24 14">
                  <polygon points="12,0 24,12 22,14 12,4 2,14 0,12" />
                </svg>
              </div>
            }
            <div
              className="next-slide-button"
              onClick={() => (
                i !== (projects.length - 1) ? this.setActiveProject(i + 1) : spaceScroll.scrollToSection(3)
              )}
            >
              <div className="preview-slide"><span>{i !== (projects.length - 1) ? projects[i + 1].title : 'Add your project here!'}</span></div>
              <svg width="24" viewBox="0 0 24 14">
                <polygon points="12,14 0,2 2,0 12,10 22,0 24,2" />
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Projects.propTypes = {
  activeProject: PropTypes.number.isRequired,
  setActiveProject: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
