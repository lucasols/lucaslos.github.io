export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PROJECT':
      return Object.assign({}, state, {
        active: action.projectId,
      });

    default:
      return state;
  }
};
