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
    const cats = this.props.catData && this.props.catData.player.cards  ? 
      _.map(this.props.catData.player.cards, (cat, i) =>{ 
        cat.height = 13;
        cat.width = 10;
        return <Cat stats={cat} key={i} />
    }) : null;

    return (
      <div className="row">
      <div className='col-sm-1'></div>
        <div className="__Hand__ col-sm-7" onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)}>
          {cats.length===0 ?
            (
              <div style={{display:'flex',width:'100%', height:'100%',justifyContent:'center',alignItems:'center'}}>
                <span style={{fontSize:'2em', color:"darkgrey"}}>Drag cats here</span> 
              </div>
            )
            : cats}
        </div>
        <div className="col-sm-3 hand_instructions">
        moose
        </div>
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