import Search from './SearchComponent';
import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {menu} from '../../reducer/menu';

const status = (state = {status: 'pending', message: ''}, action) =>
  action.type === 'change_status'
    ? {status: action.status, message: action.message}
    : state;

const filterReducer = (
  state = {
    page: 1,
    totalPages: 0,
    request: '',
    price: {
      min: 0,
      max: 2000
    },
    rating: {
      min: 0,
      max: 5
    }
  },
  action
) => {
  switch (action.type) {
    case 'change_price':
      return {
        ...state,
        price: {
          min: action.min,
          max: action.max
        }
      };
    case 'change_rating':
      return {
        ...state,
        rating: {
          min: action.min,
          max: action.max
        }
      };

    case 'change_request':
      return {...state, request: action.request};
    case 'change_page':
      return {...state, page: action.page};
    case 'change_total_pages':
      return {...state, totalPages: action.totalPages};
    default:
      return state;
  }
};

const resultsReducer = (state = [], action) => {
  switch (action.type) {
    case 'toggle_liked_flag':
      return state.map(
        result =>
          result.id === action.id
            ? {...result, isLiked: !result.isLiked}
            : result
      );
    case 'update_list':
      return [...state, ...action.results];
    case 'change_list':
      return [...action.results];
    default:
      return state;
  }
};

const session = (state = {loggedIn: false, username: ''}, action) => {
  switch (action.type) {
    case 'login':
      return {username: action.username, loggedIn: true};
    case 'logout':
      return {username: '', loggedIn: false};
    default:
      return state;
  }
};

const superReducer = combineReducers({
  menu,
  results: resultsReducer,
  filter: filterReducer,
  session,
  status
});
const store = createStore(
  superReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default () => (
  <Provider store={store}>
    <Search />
  </Provider>
);
