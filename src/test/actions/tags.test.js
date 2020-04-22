import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addTag,
  startAddTag,
  setTags,
  startSetTags,
  editTag,
  startEditTag,
  removeTag,
  startRemoveTag
} from '../../actions/tags';
import tags from '../fixtures/tags';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState={auth:{uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done)=>{
  const tagData={};
  tags.forEach(({id, tag, description})=>{
    tagData[id]={tag, description};
  });
  database.ref(`users/${uid}/tags`).set(tagData).then(()=>done());
})

test('should set tag action object with intial data', () => {
  const action = setTags(tags);
  expect(action).toEqual({
    type: 'SET_TAGS',
    tags
  })
});

test('should fetch tags from db', (done) =>{
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetTags()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'SET_TAGS',
      tags
    });
    done();
  });
});

test('should setup add tag action object', () => {
  const action = addTag(tags[0]);
  expect(action).toEqual({
    type: 'ADD_TAG',
    tag: tags[0]
  });
});

test('should add new tag data to db & store', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startAddTag(tags[0])).then(()=>{
    const action = store.getActions();
    expect(action[0]).toEqual({
      type:'ADD_TAG',
      tag: {
        id: expect.any(String),
        tag: tags[0].tag,
        description: tags[0].description
      }
    });
    return database.ref(`users/${uid}/tags/${tags[0].id}`).once('value');
  }).then((snapshot)=>{
    expect(snapshot.val()).toEqual({
      tag: tags[0].tag,
      description: tags[0].description
    });
    done();
  });
})

test('should setup edit action object', () => {
  const action = editTag('123abc', {description: 'new info'});
  expect(action).toEqual({
    id: '123abc',
    type: 'EDIT_TAG',
    updates: {description: 'new info'}
  });
});

test('should update tag 0 in db', (done) => {
  const store = createMockStore(defaultAuthState);
  const updates = { description: 'new text'};
  const id = tags[0].id;
  store.dispatch(startEditTag(id,updates)).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_TAG',
      id,
      updates
    });
    return database.ref(`users/${uid}/tags/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().description).toBe(updates.description);
    done();
  });
});

test('should setup remove action object', () => {
  const action = removeTag('123abc');
  expect(action).toEqual({
    id: '123abc',
    type: 'REMOVE_TAG'
  });
});

test('should remove tag 0 from db', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = tags[0].id;
  store.dispatch(startRemoveTag({id})).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_TAG',
      id
    });
    return database.ref(`users/${uid}/tags/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});
