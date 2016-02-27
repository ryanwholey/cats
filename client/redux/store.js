import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer.js';

const store = applyMiddleware(thunk)(createStore)(reducer);

store.subscribe((e) => {
  if(process.env.host === 'localhost') {
    console.log('current state: ', store.getState());
  }
});

export default store;