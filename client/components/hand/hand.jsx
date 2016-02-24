import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cat from './../cat/cat.jsx';
import {addToHand, spliceFromAvailable} from './../../redux/actions';
import _ from 'lodash';

import './hand.scss';

class Hand extends Component {

  allowDrop (ev) {
    ev.preventDefault();
  }

  drop (ev) {
    this.props.dispatch(addToHand(this.props.catData.currentChoice));
    this.props.dispatch(spliceFromAvailable(this.props.catData.currentChoice));
  }

  render () {
    console.log(this.props.catData.player.cards);
    const cats = this.props.catData && this.props.catData.player.cards  ? 
      _.map(this.props.catData.player.cards, (cat, i) => <Cat stats={cat} key={i} />) : null;

    return (
      <div className="__Hand__ col-lg-11" onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)}>
        {cats}
      </div>
    );
  }

};

const select = (state) => {
  return {
    catData : state.catData
  };
};

export default connect(select)(Hand);