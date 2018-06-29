export default (state = {}, { type, ...rest }) => {
  switch (type) {
    case 'ON_LOGIN':
      return { ...state, ...rest };
    case 'ON_LOGOUT':
      return { ...state, ...rest };
    default:
      return state;
  }
};
