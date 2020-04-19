export default (accounts, {account}) => {
  return accounts.filter((item) => {
    const textMatch = item.account.toLowerCase().includes(account.toLowerCase());
    return textMatch;
  }).sort((a,b)=> {
    if(a.account < b.account){
      return -1;
    } else{
      return 1;
    }
  });
};
