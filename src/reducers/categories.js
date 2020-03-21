export default (state = [], action) => {
  switch(action.type){
    case 'ADD_CATEGORY':
      return state.concat(action.category);
    case 'SET_CATEGORIES':
      return action.categories;
    default:
      return state;
  }
};
