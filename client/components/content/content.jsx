import React, { Component } from 'react';
import * as actions from './../../redux/actions';
import { connect } from 'react-redux';
import CatList from './../catList/catList.jsx';
import { buildCat } from './../../util.js';
import Hand from './../hand/hand.jsx';
import Modal from './../modal/modal.jsx';
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

  }

  render () {
    switch(this.props.catData.battleStatus){
      case 'PRE_BATTLE':
        return this.draftTeam.call(this);
      case 'MID_BATTLE':
        return <Battle />
      case 'POST_BATTLE':
        return <div>POST BATTLE</div>
    }
    return this.props.catData.battleStatus === 'PRE_BATTLE' ? this.draftTeam.call(this) : <div>BATTLE </div>
  }

}

const select = (state) => {
  return {
    catData: state.catData
  };
};

export default connect(select)(Content);


