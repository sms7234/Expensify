import categoriesReducer from '../../reducers/categories';
import categories from '../fixtures/categories';

test('should set default state', () => {
  const state = categoriesReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should set categories', () => {
  const action = {
    type: 'SET_CATEGORIES',
    categories: [categories[0]]
  };
  const state = categoriesReducer(categories,action);
  expect(state).toEqual([categories[0]]);
})

test('should add category to store', () => {
  const newObj= {
    id: '4',
    category: 'bank fees',
    description:''
  };
  const action = {
    type: 'ADD_CATEGORY',
    category: newObj
  };
  const state = categoriesReducer(categories, action);
  expect(state).toEqual([...categories, newObj]);
})

test('should remove category by id', () => {
  const action= {
    type: 'REMOVE_CATEGORY',
    id: categories[1].id
  };
  const state = categoriesReducer(categories,action);
  expect(state).toEqual([categories[0],categories[2]]);
});

test('should edit an existing category', () => {
  const newObj = {
    ...categories[0],
    description: 'new text'
  }
  const action = {
    type: 'EDIT_CATEGORY',
    id: categories[0].id,
    updates: {
      description: 'new text'
    }
  };
  const state = categoriesReducer(categories, action);
  expect(state).toEqual([newObj, categories[1], categories[2]]);
})
