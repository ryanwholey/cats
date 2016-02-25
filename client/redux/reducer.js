import { combineReducers } from 'redux';
import { buildCat, draftEnemies } from './../util.js';

const DEFAULT_CAT_DATA = 
  { 
    stateChange : 'not yet changed',
    facts : {},
    pics: {},
    player:{
      cards: {},
      left: 100,
      charInBattle: 1
    },
    enemy:{
      cards:{},
      left: 500,
      charInBattle: 1
    },
    battleStatus: 'PRE_BATTLE'
  };



const catData = (state = DEFAULT_CAT_DATA, action) => {
  
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
    case 'CURRENT_CHOICE':
      return Object.assign({}, state, {currentChoice: action.payload});
    case 'ADD_TO_HAND':
      state.player.cards[action.payload] = state.cards[action.payload];
      return Object.assign({}, state);
    case 'SPLICE_FROM_AVAILABLE':
      delete state.cards[action.payload]
      // state.cards.splice(action.payload, 1);
      return Object.assign({}, state);
    case 'START_BATTLE':
      return Object.assign({}, state, {'battleStatus': 'MID_BATTLE'});
    case 'DRAFT_ENEMIES':
      draftEnemies(state);
      return Object.assign({}, state);
    case 'MOVE_LEFT':
      state.player.left -= action.payload;
      return Object.assign({}, state);
    case 'MOVE_RIGHT':
      state.player.left += action.payload;
      return Object.assign({}, state);
    case 'CHAR_IN_BATTLE':
        state[action.payload.user].charInBattle = action.payload.index;
        return Object.assign({}, state);
    default:
      return state;
  }
};


export default combineReducers(
  {
    catData
  }
);