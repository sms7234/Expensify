export default (tags, {tag}) => {
  return tags.filter((item) => {
    const textMatch = item.tag.toLowerCase().includes(tag.toLowerCase());
    return textMatch;
  }).sort((a,b)=> {
    if(a.tag < b.tag){
      return -1;
    } else{
      return 1;
    }
  });
};
