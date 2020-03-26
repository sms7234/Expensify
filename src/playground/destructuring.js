const loadMe=false;

const renderer = (loadMe) => {
  if(loadMe){
    console.log('loadMe')
  } else if(!loadMe){
    console.log('!loadMe')
  }
}

renderer(loadMe);
