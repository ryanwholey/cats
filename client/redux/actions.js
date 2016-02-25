
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

export const startBattle = () => {
  return {
    type: 'START_BATTLE',
  };
};

export const draftEnemies = () => {
  return {
    type: 'DRAFT_ENEMIES'
  };
};

export const moveLeft = (n=10) => {
  return {
    type:'MOVE_LEFT',
    payload: n
  };
};

export const moveRight = (n=10) => {
  return {
    type:'MOVE_RIGHT',
    payload: n
  };
};

export const attack = () => {
  return {
    type: 'ATTACK',
  };
};

export const setCharInBattle = (user, index) => {
  return {
    type: 'CHAR_IN_BATTLE',
    payload: {user,index}
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
