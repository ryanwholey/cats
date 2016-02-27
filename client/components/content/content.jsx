import React, { Component } from 'react';
import * as actions from './../../redux/actions';
import { connect } from 'react-redux';
import CatList from './../catList/catList.jsx';
import { buildCat } from './../../util.js';
import Hand from './../hand/hand.jsx';
import Modal from './../modal/modal.jsx';
import EndBattleModal from './../modal/endBattleModal.jsx';
import Battle from './../battle/battle.jsx';

import './content.scss';

class Content extends Component {

  draftTeam () {
    return (
      <div id="__content__" className="container">
        {Object.keys(this.props.catData.player.cards).length >= 3 ? <Modal /> : null}
          <div className="row">
            <Hand />
          </div>
          <div className="row">
            <CatList />
          </div>
      </div>
    );
  }

  battle () {
    return (
      <div>
        { this.props.catData.battleStatus === 'POST_BATTLE' ? <EndBattleModal winner={this.props.catData.winner}/> : null }
        <Battle />
      </div>
    );
  }

  render () {
    
    switch(this.props.catData.battleStatus) {
      case 'PRE_BATTLE':
        return this.draftTeam.call(this);
      case 'MID_BATTLE':
      case 'POST_BATTLE':
        return this.battle.call(this);
        
    }
    return this.props.catData.battleStatus === 'PRE_BATTLE' ? this.draftTeam.call(this) : <div>BATTLE </div>;
  }

}

const select = (state) => {
  return {
    catData: state.catData
  };
};

export default connect(select)(Content);


