import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addCategory,
  startAddCategory,
  setCategories,
  startSetCategories,
  editCategory,
  startEditCategory,
  removeCategory,
  startRemoveCategory
} from '../../actions/categories';
import categories from '../fixtures/categories';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState={auth:{uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done)=>{
  const categoryData={};
  categories.forEach(({id, category, description})=>{
    categoryData[id]={category, description};
  });
  database.ref(`users/${uid}/categories`).set(categoryData).then(()=>done());
})

test('should set category action object with intial data', () => {
  const action = setCategories(categories);
  expect(action).toEqual({
    type: 'SET_CATEGORIES',
    categories
  })
});

test('should fetch categories from db', (done) =>{
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetCategories()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'SET_CATEGORIES',
      categories
    });
    done();
  });
});

test('should setup add category action object', () => {
  const action = addCategory(categories[0]);
  expect(action).toEqual({
    type: 'ADD_CATEGORY',
    category: categories[0]
  });
});

test('should add new category data to db & store', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startAddCategory(categories[0])).then(()=>{
    const action = store.getActions();
    expect(action[0]).toEqual({
      type:'ADD_CATEGORY',
      category: {
        id: expect.any(String),
        category: categories[0].category,
        description: categories[0].description
      }
    });
    return database.ref(`users/${uid}/categories/${categories[0].id}`).once('value');
  }).then((snapshot)=>{
    expect(snapshot.val()).toEqual({
      category: categories[0].category,
      description: categories[0].description
    });
    done();
  });
})

test('should setup edit action object', () => {
  const action = editCategory('123abc', {description: 'new info'});
  expect(action).toEqual({
    id: '123abc',
    type: 'EDIT_CATEGORY',
    updates: {description: 'new info'}
  });
});

test('should update category 0 in db', (done) => {
  const store = createMockStore(defaultAuthState);
  const updates = { description: 'new text'};
  const id = categories[0].id;
  store.dispatch(startEditCategory(id,updates)).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_CATEGORY',
      id,
      updates
    });
    return database.ref(`users/${uid}/categories/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().description).toBe(updates.description);
    done();
  });
});

test('should setup remove action object', () => {
  const action = removeCategory('123abc');
  expect(action).toEqual({
    id: '123abc',
    type: 'REMOVE_CATEGORY'
  });
});

test('should remove category 0 from db', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = categories[0].id;
  store.dispatch(startRemoveCategory({id})).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_CATEGORY',
      id
    });
    return database.ref(`users/${uid}/categories/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});
