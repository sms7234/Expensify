export default (state=[], action) => {
  switch(action.type){
    case 'SET_ACCOUNTS':
      return action.accounts;
    case 'ADD_ACCOUNT':
      return state.concat(action.account);
    case 'EDIT_ACCOUNT':
      return state.map((item) => {
        if (item.id === action.id){
          return {
            ...item,
            ...action.updates
          }
        } else {return item}
      });
      case 'REMOVE_ACCOUNT':
        return state.filter(({id}) => id!==action.id);
    default:
      return state;
  }
}
