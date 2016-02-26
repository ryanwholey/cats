import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer.js';

const store = applyMiddleware(thunk)(createStore)(reducer);

store.subscribe((e) => {
  // console.log(e);
  // console.log('current state:', store.getState());
});

export default store;