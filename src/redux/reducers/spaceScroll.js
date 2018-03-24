export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_SECTION':
      return Object.assign({}, state, {
        activeSection: action.sectionId,
      });

    default:
      return state;
  }
};
