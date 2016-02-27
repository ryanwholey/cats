
export const changeState = (input) => {
  return {
    type: 'STATE_CHANGE',
    payload: input
  };
};

export const currentChoice = (choice) => {
  return {
    type: 'CURRENT_CHOICE',
    payload: choice
  };
};

export const addToHand = (index) => {
  return {
    type: 'ADD_TO_HAND',
    payload: index
  };
};

export const spliceFromAvailable = (index) => {
  return {
    type: 'SPLICE_FROM_AVAILABLE',
    payload: index
  };
};

export const changeBattleStatus = (status,winner) => {
  return {
    type : 'CHANGE_BATTLE_STATUS',
    payload : { status, winner }
  };
};

export const restart = () => {
  return {
    type: 'RESTART'
  };
};

export const draftEnemies = () => {
  return {
    type: 'DRAFT_ENEMIES'
  };
};

export const decision = (winner) => {
  return {
    type: 'DECISION',
    payload: winner
  };
};

export const moveLeft = (player, n=10) => {
  return {
    type:'MOVE_LEFT',
    payload: { player,n }
  };
};

export const moveRight = (player, n = 10) => {
  return {
    type:'MOVE_RIGHT',
    payload: { player,n }
  };
};

export const attack = (() => {
  let throttled = false;
  return (attacker, attackerCard, defenderCard) => {
    if(!throttled) {
      throttled = true;
      setTimeout(()=> {
        throttled = false;
      }, 320);
      return {
        type: 'ATTACK',
        payload: { attacker, attackerCard, defenderCard }
      };
    } else {
      return { type : null };
    }
  };
})();


export const setCharInBattle = (user, index) => {
  return {
    type: 'CHAR_IN_BATTLE',
    payload: { user, index }
  };
};

export const getPictures = () => {
  return (dispatch) => {
    return fetch('http://localhost:8000/pics')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Signup failure: ', response);
        }
        return response.text();
      })
      .then((body) => {
        let xmlChild = $.parseXML(body).getElementsByTagName('images')[0].childNodes;
        return Array.prototype.slice.call(xmlChild)
          .filter((item) => item.nodeType === 1)
          .map((item) => {
            return item.getElementsByTagName('url')[0].innerHTML;
          });
      })
      .then((urls)=>{
        dispatch({
          type : 'GET_PICTURES',
          payload : urls
        });
        dispatch({
          type : 'BUILD_CATS'
        });
        return;
      })
      .catch((error) => {
        return dispatch(
          {
            type:'GET_PICTURES_FAILURE',
            payload: error
          }
        );
      });
  };
};

export const getFacts = () => {
  return (dispatch) => {
    return fetch('http://localhost:8000/facts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Signup failure: ', response);
        }
        return response.json();
      })
      .then((body) => {
        return dispatch(
          {
            type:'GET_FACTS',
            payload: body.facts
          }
        );
      })
      .catch((error) => {
        return dispatch(
          {
            type:'GET_FACTS_FAILURE',
            payload: error
          }
        );
      });
  };
};
