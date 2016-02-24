import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cat from './../cat/cat.jsx';

import './hand.scss';

class Hand extends Component {

  render () {

    const cats = this.props.player && this.props.player.cards  ? 
      this.props.player.cards.map((cat, i) => <Cat stats={cat} key={i}/>) : null;

    return (
      <div className="__Hand__ col-lg-11">
        
      </div>
    );
  }

};

const select = (state) => {
  return {
    player : state.player
  };
};

export default connect(select)(Hand);