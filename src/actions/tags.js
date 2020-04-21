import database from '../firebase/firebase';

export const setTags = (tags) => ({
  type: "SET_TAGS",
  tags
});

export const startSetTags = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/tags`)
      .once('value')
      .then((snapshot) => {
        const tags = [];
        snapshot.forEach((child) => {
          tags.push({
            id: child.key,
            ...child.val()
          });
        });
        dispatch(setTags(tags));
      });
  };
};

export const addTag = (tag) =>({
  type: "ADD_TAG",
  tag
});

export const startAddTag = (tagData={}) => {
  return (dispatch, getState) => {
    const {
      tag='',
      description=''
    } = tagData;
    const tagItem={tag,description};
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/tags`).push(tagItem).then((ref)=>{
      dispatch(addTag({
        id: ref.key,
        ...tagItem
      }));
    });
  };
};

export const editTag = (id, updates) => ({
  type: 'EDIT_TAG',
  id,
  updates
});

export const startEditTag = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/tags/${id}`).update(updates).then(()=>{
      dispatch(editTag(id,updates));
    });
  };
};

export const removeTag = (id) => ({
  type: 'REMOVE_TAG',
  id
});

export const startRemoveTag = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/tags/${id}`).remove().then(()=>{
      dispatch(removeTag(id));
    });
  };
};
