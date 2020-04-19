export default (state=[], action) => {
  switch(action.type){
    case 'SET_ACCOUNTS':
      return action.accounts;
    case 'ADD_ACCOUNT':
      return state.concat(action.accounts);
    default:
      return state;
  }
}
