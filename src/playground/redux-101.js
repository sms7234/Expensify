import { createStore } from 'redux';

const countReducer = (state={count:0}, action) => {
  switch(action.type) {
    case 'INCREMENT':
    return{
      count: state.count + action.incrementBy
    };
    case 'DECREMENT':
    return{
      count: state.count - action.decrementBy
    };
    case 'SET':
    return{
      count: action.setTo
    };
    case 'RESET':
    return{
      count: 0
    };
    default:
    return state;
  }
};

const store = createStore(countReducer);

const incrementCount = ({incrementBy = 1} = {}) =>({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) =>({
  type: 'DECREMENT',
  decrementBy
});

const resetCount = ()=>({
  type: 'RESET'
});

const setCount = ({setTo = 0}={}) => ({
  type: 'SET',
  setTo
});

store.subscribe(() => {
  console.log(store.getState())
})
store.dispatch(incrementCount({incrementBy: 5}))
store.dispatch(incrementCount())
store.dispatch(decrementCount())
store.dispatch(decrementCount({decrementBy: 3}))
store.dispatch(resetCount())
store.dispatch(setCount({setTo: 100}))
