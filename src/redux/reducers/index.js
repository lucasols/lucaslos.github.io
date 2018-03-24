import { combineReducers } from 'redux';
import spaceScroll from '../reducers/spaceScroll';
import projects from '../reducers/projects';
import contactForm from '../reducers/contactForm';

export default combineReducers({
  language: (state = {}) => state,
  spaceScroll,
  bio: (state = {}) => state,
  skills: (state = {}) => state,
  education: (state = {}) => state,
  moreAboutMe: (state = {}) => state,
  projects,
  contactForm,
  socialLinks: (state = {}) => state,
});
