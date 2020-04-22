import tagsReducer from '../../reducers/tags';
import tags from '../fixtures/tags';

test('should set default state', () => {
  const state = tagsReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should set tags', () => {
  const action = {
    type: 'SET_TAGS',
    tags: [tags[0]]
  };
  const state = tagsReducer(tags,action);
  expect(state).toEqual([tags[0]]);
})

test('should add tag to store', () => {
  const newObj= {
    id: '4',
    tag: 'bank fees',
    description:''
  };
  const action = {
    type: 'ADD_TAG',
    tag: newObj
  };
  const state = tagsReducer(tags, action);
  expect(state).toEqual([...tags, newObj]);
})

test('should remove tag by id', () => {
  const action= {
    type: 'REMOVE_TAG',
    id: tags[1].id
  };
  const state = tagsReducer(tags,action);
  expect(state).toEqual([tags[0],tags[2]]);
});

test('should edit an existing tag', () => {
  const newObj = {
    ...tags[0],
    description: 'new text'
  }
  const action = {
    type: 'EDIT_TAG',
    id: tags[0].id,
    updates: {
      description: 'new text'
    }
  };
  const state = tagsReducer(tags, action);
  expect(state).toEqual([newObj, tags[1], tags[2]]);
})
