
export const changeState = (input) => {
  return {
    type: 'STATE_CHANGE',
    payload: input
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
