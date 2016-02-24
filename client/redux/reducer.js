import { combineReducers } from 'redux';

var DEFAULT = { 'stateChange' : 'not yet changed' };

const general = (state = DEFAULT, action) => {
  switch(action.type) {
    case 'STATE_CHANGE':
      return { 'stateChange' : action.payload };
    case 'GET_PICTURES':
      return Object.assign({}, state, { pics: action.payload });
    case 'GET_FACTS':
      return Object.assign({}, state, { facts: action.payload });
    case 'GET_PICTURES_FAILURE':
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  general
});