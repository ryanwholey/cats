import { combineReducers } from 'redux';
import { buildCat } from './../util.js';

const DEFAULT = 
  { 
    'stateChange' : 'not yet changed'
  };

const catData = (state = DEFAULT, action) => {
  switch(action.type) {
    case 'STATE_CHANGE':
      return { 'stateChange' : action.payload };
    case 'GET_PICTURES':
      return Object.assign({}, state, { pics: action.payload });
    case 'GET_FACTS':
      return Object.assign({}, state, { facts: action.payload });
    case 'GET_PICTURES_FAILURE':
      return state;
    case 'BUILD_CATS':
      const cards = buildCat(state.pics, state.facts);
      return Object.assign({}, state, { cards });
    default:
      return state;
  }
};

export default combineReducers(
  {
    catData
  }
);