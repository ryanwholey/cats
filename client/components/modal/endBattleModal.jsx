import React, { Component } from 'react';
import store from './../../redux/store';
import  * as actions from './../../redux/actions';

import './modal.scss';

export default class EndBattleModal extends Component {

  handleClick () {
    store.dispatch(actions.restart());
    store.dispatch(actions.getPictures());
    store.dispatch(actions.getFacts());
  }

  render () {
    return (
      <div className='__Modal__ row animated fadeIn'>

        <div className="mod_alert well col-lg-12 " >
          <div className="icon_container col-lg-12">
            <img className="icon" src='./sword.png' />
          </div>
          <h4 className="mod_title"> { this.props.winner === 'player' ? 'WINNER' : 'LOSER' }  </h4>
          <h5 className="mod_subtitle"> Click here to play again! The fun never stops. Ever. </h5>
          <div className="mod_button" onClick={ this.handleClick.bind(this) }> <span>PLAY AGAIN </span></div>

        </div>
      </div>
    );
  }

};

