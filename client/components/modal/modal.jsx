import React, { Component } from 'react';

import './modal.scss';

import sword from './sword.png';
import store from './../../redux/store';
// import {startBattle, draftEnemies, setCharInBattle} from './../../redux/actions';
import * as actions from './../../redux/actions';

export default class Modal extends Component {

  handleClick () {
    store.dispatch(actions.changeBattleStatus('MID_BATTLE'));
    // store.dispatch(startBattle());
  }

  componentDidMount (){
    store.dispatch(actions.draftEnemies());
    store.dispatch(actions.setCharInBattle('player', 0));
    store.dispatch(actions.setCharInBattle('enemy', 0));
  }

  render () {
    return (
      <div className='__Modal__ row animated fadeIn'>

        <div className="mod_alert well col-lg-12 " onClick={this.handleClick.bind(this)}>
          <div className="icon_container col-lg-12">
            <img className="icon" src='./sword.png' />
          </div>
          <h4 className="mod_title"> Are you ready to do battle!?  </h4>
          <h5 className="mod_subtitle"> Move with the arrows and hit with the space </h5>
          <div className="mod_button" > <span>BATTLE </span></div>

        </div>
        
      </div>
    );
  }

};

