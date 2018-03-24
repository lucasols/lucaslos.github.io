export const setAciveSection = sectionId => ({
  type: 'SET_ACTIVE_SECTION',
  sectionId,
});

export const setActiveProject = projectId => ({
  type: 'SET_ACTIVE_PROJECT',
  projectId,
});

export const setVisibilityContactForm = isOpen => ({
  type: 'SET_VISIBILITY_CONTACT_FORM',
  isOpen,
});
