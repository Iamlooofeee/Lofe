import React from 'react';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {Provider, connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import SignIn from './SignIn';
import SignUp from './SignUp';

const authType = (state = 'sign_in', action) => {
  // make normal understandable names
  switch (action.type) {
    case 'toggle':
      return state === 'sign_in' ? 'sign_up' : 'sign_in';
    default:
      return state;
  }
};

let ToggleButton = ({onClick, authType}) => (
  <Button style={{margin: 'auto'}} onClick={() => onClick()}>
    {authType.split('_').join(' ')}
  </Button>
);

ToggleButton = connect(
  ({authType}) => {
    return {authType};
  },
  dispatch => {
    return {
      onClick: () => dispatch({type: 'toggle'})
    };
  }
)(ToggleButton);

let Authorization = ({authType}) =>
  authType === 'sign_in' ? (
    <SignIn onSubmit={values => console.log(values)} />
  ) : (
    <SignUp onSubmit={values => console.log(values)} />
  );

Authorization = connect(({authType}) => {
  return {authType};
})(Authorization);

const rootReducer = combineReducers({form: formReducer, authType});
const store = createStore(rootReducer);

const Login = () => (
  <Provider store={store}>
    <div>
      <ToggleButton />
      <Authorization />
    </div>
  </Provider>
);

export default Login;
