import moment from 'moment';

export default [{
  id:'1',
  category: 'Gum',
  business:'walmart',
  note:'',
  amount: 195,
  purchaseDate: 0
},
{
  id:'2',
  category: 'Rent',
  business:'',
  note:'',
  amount: 109500,
  purchaseDate: moment(0).subtract(4,'days').valueOf()
},{
  id:'3',
  category: 'Credit Card',
  business:'',
  note:'',
  amount: 4500,
  purchaseDate: moment(0).add(4, 'days').valueOf()
}
]
