import moment from 'moment';

export default [{
  id:'1',
  category: 'Gum',
  business:'walmart',
  note:'',
  amount: 195,
  purchaseDate: 0,
  createdAt: 0,
  updatedAt: 0
},
{
  id:'2',
  category: 'Rent',
  business:'',
  note:'',
  amount: 109500,
  purchaseDate: moment(0).subtract(4,'days').valueOf(),
  createdAt: 500,
  updatedAt: 700
},{
  id:'3',
  category: 'Credit Card',
  business:'',
  note:'',
  amount: 4500,
  purchaseDate: moment(0).add(4, 'days').valueOf(),
  createdAt: 1000,
  updatedAt: 5000
}
]
