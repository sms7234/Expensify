export default (state = [], action) => {
  switch(action.type){
    case 'ADD_CATEGORY':
      return state.concat(action.category);
    case 'SET_CATEGORIES':
      return action.categories;
    case 'EDIT_CATEGORY':
      return state.map((item) => {
        if (item.id === action.id){
          return{
            ...item,
            ...action.updates
          }
        }
        else { return item }
      });
    case 'REMOVE_CATEGORY':
      return state.filter(({id})=> id!==action.id);
    default:
      return state;
  }
};
