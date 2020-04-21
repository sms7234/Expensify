export default (state=[], action) => {
  switch(action.type){
    case 'SET_TAGS':
      return action.tags;
    case 'ADD_TAG':
      return state.concat(action.tag);
    case 'EDIT_TAG':
      return state.map((item) => {
        if (item.id === action.id){
          return {
            ...item,
            ...action.updates
          }
        } else {return item}
      });
      case 'REMOVE_TAG':
        return state.filter(({id}) => id!==action.id);
    default:
      return state;
  }
}
