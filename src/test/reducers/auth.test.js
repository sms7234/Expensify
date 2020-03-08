import authReducer from '../../reducers/auth';

test('testing reducer for login function', () => {
  const action = {type: 'LOGIN', uid: '1234'}
  const state = authReducer({},action)
  expect(state.uid).toEqual('1234')
})

test('testing reducer for logout function', () => {
  const action = {type: 'LOGOUT'}
  const state = authReducer({},action)
  expect(state).toEqual({})
})
