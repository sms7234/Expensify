export default (categories, {category}) => {
  return categories.filter((item) => {
    const textMatch = item.category.toLowerCase().includes(category.toLowerCase());
    return textMatch;
  }).sort((a,b)=>{
    if(a.category < b.category){
      return -1;
    } else {
      return 1;
    }
  });
};
