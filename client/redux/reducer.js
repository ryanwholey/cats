import { combineReducers } from 'redux';
import { buildCat, draftEnemies, isCollision } from './../util.js';

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
      cards: {},
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
    case 'ATTACK':
      
      if(isCollision(state)) {
        if(action.payload.attacker === 'player') {
          state.enemy.cards[action.payload.defenderCard].hp -= state.player.cards[action.payload.attackerCard].at;
          if(state.enemy.cards[action.payload.defenderCard].hp < 0){
            state.enemy.cards[action.payload.defenderCard].hp = 0;
          }
          // action.payload.defenderCard.hp -= action.payload.attackerCard.at;
  
          // if(action.payload.defenderCard.hp < 0){
          //   console.log('dead');
          //   action.payload.defenderCard.hp = 0;
          // }
          // state.enemy.cards[state.enemy.charInBattle].hp -= state.player.chards[state.player.charInBattle].at;
        } else{
          // state.player.cards[state.player.charInBattle].hp -= state.enemy.chards[state.enemy.charInBattle].at;
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