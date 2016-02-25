import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cat from './../cat/cat.jsx';
import _ from 'lodash';
import * as actions from './../../redux/actions';

import './battle.scss';

class Battle extends Component {

  componentDidMount () {
    const keys = []
    let movement = null;
    window.onkeydown = window.onkeyup = movement = (e) => {
      if(e.keyCode!==37 && e.keyCode!==39 && e.keyCode!==32){
        return 
      }
      e = e || event;
      keys[e.keyCode] = e.type === 'keydown';
      console.log(keys);
      if(keys[37 && keys[39] && keys[32]]) {
        this.props.dispatch(actions.moveLeft());
        this.props.dispatch(actions.moveRight());
        this.props.dispatch(actions.attack());
        return;
     
      } else if(keys[37] && keys[39]) {
        this.props.dispatch(actions.moveLeft());
        this.props.dispatch(actions.moveRight());
        return;
      } else if(keys[37] && keys[32]) {
        this.props.dispatch(actions.moveLeft());
        this.props.dispatch(actions.attack());
        return;
      } else if(keys[39] && keys[32]) {
        this.props.dispatch(actions.moveRight());
        this.props.dispatch(actions.attack());
        return;
      } 
       else if(keys[37]) {
        this.props.dispatch(actions.moveLeft());
        return;
      } else if(keys[39]) {
        this.props.dispatch(actions.moveRight());
        return;
      } else if(keys[32]) {
        this.props.dispatch(actions.attack());
        return;
      }
    }
     
  }

  render () {
    const catHeight = 9;
    const catWidth = 8;

    const initCat = (cat) => {
      cat.height = catHeight;
      cat.width = catWidth;
      cat.show = true;
      cat.thumb = true;
    };

    const myCats = _.map(this.props.catData.player.cards, (cat, i) => {
      initCat(cat);
      return <Cat stats={cat} key={cat.index}/>
    });
      
    const theirCats = _.map(this.props.catData.enemy.cards, (cat, i) => {
      initCat(cat);
      return <Cat stats={cat} key={cat.index}/>
    });

   

    return (
      <div className='__Battle__' >
        <div className="well field">
          <div className="player" style={{left: this.props.catData.player.left + 'px'}}>{myCats[this.props.catData.player.charInBattle]}</div>
          <div className="enemy" style={{left: this.props.catData.enemy.left + 'px'}}>{theirCats[this.props.catData.enemy.charInBattle]}</div>
        </div>
        <div className='baseline'>
          <div className="my_cats">
            {myCats}
          </div>
          <div className="filler"></div> 
          <div className="their_cats">
            {theirCats}
          </div>
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

export default connect(select)(Battle);