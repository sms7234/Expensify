const expensesReducersDefaultState = []

export default (state = expensesReducersDefaultState, action) => {
  switch (action.type){
    case 'ADD_EXPENSE':
      return state.concat(action.expense);
    case 'REMOVE_EXPENSE':
      return state.filter(({id})=> id!==action.id);
    case 'EDIT_EXPENSE':
      return state.map((item) => {
        if (item.id === action.id){
          return {
            ...item,
            ...action.updates
          }

        }
        else {
          return item
        }
      })
    default:
      return state;
  }
};
