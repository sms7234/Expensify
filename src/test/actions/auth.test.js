import {login, logout} from '../../actions/auth';

test('testing login action generator', () => {
  const action = login('1234');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: '1234'
  });
});

test('testing logout action generator', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
