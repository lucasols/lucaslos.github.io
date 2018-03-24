export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_CONTACT_FORM':
      return Object.assign({}, state, {
        isOpen: action.isOpen,
      });

    default:
      return state;
  }
};
