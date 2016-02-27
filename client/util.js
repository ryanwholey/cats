import { names } from './names';
import _ from 'lodash';

export const buildCat = (pics, items) => {
  const cats = {};
  
  pics.forEach((item, index) => {
    cats[index] = 
      {
        index: index,
        name: names[calcStat(item.substring(40,41),names.length - 1,0)],
        pic: item,
        fact: items[index],
        hp: calcStat(item.substring(40, 42), 20, 5),
        at: calcStat(item.substring(37,39), 6, 3),
        show: false
      };
  });
  return cats;
};


const calcStat = (str, max, min) => {
  return (+str.split('').map((char) => char.charCodeAt(0)).join('') % (max - min))  + min;
};

export const isCollision = (state) => {
  return state.enemy.left - state.player.left <= 190 && state.enemy.left -state.player.left >= 80;
};

export const draftEnemies = (state) => {
  var indecies = {};
  for(var i = 0; i < 3; i++) {
    var cat = _.sample(state.cards);
    if(indecies[cat.index]) {
      i--;
    } else {
      state.enemy.cards[cat.index] = cat;
      indecies[cat.index] = true;
    }
  }
};



