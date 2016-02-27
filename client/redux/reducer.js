import { combineReducers } from 'redux';
import { buildCat, draftEnemies, isCollision } from './../util.js';

const DEFAULT_CAT_DATA = 
  { 
    facts : {},
    pics: {},
    player:{
      cards: {},
      left: 100,
      charInBattle: 1
    },
    enemy:{
      cards: {},
      left: window.innerWidth-200,
      charInBattle: 1
    },
    winner: '',
    battleStatus: 'PRE_BATTLE'
  };



const catData = (state = DEFAULT_CAT_DATA, action) => {
  
  switch(action.type) {
    case 'GET_PICTURES':
      return Object.assign({}, state, { pics: action.payload });
    case 'GET_FACTS':
      return Object.assign({}, state, { facts: action.payload });
    case 'GET_PICTURES_FAILURE':
      return state;
    case 'BUILD_CATS':
      const cards = buildCat(state.pics, state.facts);
      return Object.assign({}, state, { cards });
    case 'ADD_TO_HAND':
      state.player.cards[action.payload] = state.cards[action.payload];
      return Object.assign({}, state);
    case 'SPLICE_FROM_AVAILABLE':
      delete state.cards[action.payload];
      return Object.assign({}, state);
    case 'CHANGE_BATTLE_STATUS':
      let winner = action.payload.winner || '';
      return Object.assign({}, state, { 'battleStatus' : action.payload.status, winner : winner });
    case 'CURRENT_CHOICE':
      return Object.assign({}, state, { currentChoice: action.payload });
    case 'DRAFT_ENEMIES':
      draftEnemies(state);
      return Object.assign({}, state);
    case 'MOVE_LEFT':
      let current = state[action.payload.player].left;
      if(current === 0) {
        return state;
      }
      state[action.payload.player].left -= action.payload.n;
      return Object.assign({}, state);
    case 'MOVE_RIGHT':
    let rightCurrent = state[action.payload.player].left;
    
      if(rightCurrent > window.innerWidth-140) {
        return state;
      }
      state[action.payload.player].left += action.payload.n;
      return Object.assign({}, state);
    case 'CHAR_IN_BATTLE':
      state[action.payload.user].charInBattle = action.payload.index;
      return Object.assign({}, state);
    case 'RESTART':
      DEFAULT_CAT_DATA.player = {
        cards: {},
        left: 100,
        charInBattle: 1
      };
      DEFAULT_CAT_DATA.enemy = {
        cards: {},
        left: window.innerWidth-200,
        charInBattle: 1
      };
      return Object.assign({}, DEFAULT_CAT_DATA);
    case 'ATTACK':
      if(isCollision(state)) {
        if(action.payload.attacker === 'player') {
          state.enemy.cards[action.payload.defenderCard].hp -= state.player.cards[action.payload.attackerCard].at;
          if(state.enemy.cards[action.payload.defenderCard].hp < 0) {
            state.enemy.cards[action.payload.defenderCard].hp = 0;
          }
        } else {
          state.player.cards[action.payload.defenderCard].hp -= state.enemy.cards[action.payload.attackerCard].at;
          if(state.player.cards[action.payload.defenderCard].hp < 0) {
            state.player.cards[action.payload.defenderCard].hp = 0;
          }
        }
      }
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