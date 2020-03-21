import database from '../firebase/firebase';

export const setCategories = (categories) => ({
  type:"SET_CATEGORIES",
  categories
});

export const startSetCategories = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/categories`)
      .once('value')
      .then((snapshot) => {
        const categories = [];
        snapshot.forEach((child) => {
          categories.push({
            id: child.key,
            ...child.val()
          });
        });
        dispatch(setCategories(categories));
      });
  };
};

export const addCategory = (category) => ({
  type: 'ADD_CATEGORY',
  category
});

export const startAddCategory = (categoryData = {}) => {
  return (dispatch, getState) =>{
    const {
      category= '',
      description= ''
    } = categoryData;
    const categoryItem = {category, description};
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/categories`).push(categoryItem).then((ref)=>{
      dispatch(addCategory({
        id: ref.key,
        ...categoryItem
      }));
    });
  };
};
