export default (categories, {text}) => {
  return categories.filter((item) => {
    const textMatch = item.category.toLowerCase().includes(text.toLowerCase());
    return textMatch;
  }).sort((a,b)=>{
    if(a.category < b.category){
      return -1;
    } else {
      return 1;
    }
  });
};
