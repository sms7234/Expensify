import selectAccount from '../../selectors/accounts';
import accounts from '../fixtures/accounts';

test('should filter by text value', () =>{
  const result = selectAccount(accounts,{account: 'o'});
  expect(result).toEqual([accounts[0]]);
})

test('should oder objects alphabetically', () => {
  const result = selectAccount(accounts,{account: ''});
  expect(result).toEqual([accounts[0],accounts[2],accounts[1]]);
})
