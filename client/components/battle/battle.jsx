import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cat from './../cat/cat.jsx';
import _ from 'lodash';
import * as actions from './../../redux/actions';
import './sword.png';
import './blue.png';
import './red.png';
import './explosion.png';
import './battle.scss';
import './background.jpg';

class Battle extends Component {
  constructor () {
    super();
    this.playerSword = null;
    this.enemySword = null;
    this.myCats = null;
    this.theirCats = null;
    this.enemyInerval = null;
    //set state only for varialbes that don't need to be shared
    this.state = {
      enemy: true,
      player: true
    };
  }

  //starts enemy movements
  startEnemy () {
    const myCats = _.values(this.props.catData.player.cards);
    const theirCats = _.values(this.props.catData.enemy.cards);
    let direction = 'LEFT';
    var count = 0;
    this.enemyInterval = setInterval(() => {
      direction === 'LEFT' ? 
        this.props.dispatch(actions.moveLeft('enemy')) : 
        this.props.dispatch(actions.moveRight('enemy'));
      count += 1;
      if(count % 5 === 0) {
        direction = Math.random() > .5 ? 'RIGHT' : 'LEFT';
      }
      if(Math.random() > .5) {
        this.swingWeapon(this.enemySword, 'enemy');
        this.props.dispatch(actions.attack('enemy',
          theirCats[this.props.catData.enemy.charInBattle].index,
          myCats[this.props.catData.player.charInBattle].index));
      }
    }, 200);
  }
  //stops enemy movements
  stopEnemy () {
    clearInterval(this.enemyInterval);
  }

  // sets event listeners
  componentDidMount () {
    this.startEnemy();
    this.playerSword = $('.player_sword');
    this.enemySword = $('.enemy_sword');
    const keys = [];

    const myCats = _.values(this.props.catData.player.cards);
    const theirCats = _.values(this.props.catData.enemy.cards);

    window.onkeydown = window.onkeyup = (e) => {
      e = e || event;
      if(e.keyCode!==37 && e.keyCode!==39 && e.keyCode!==32) {
        return;
      }
      keys[e.keyCode] = e.type === 'keydown';
      if(keys[37 && keys[39] && keys[32]]) {
        this.props.dispatch(actions.moveLeft('player'));
        this.setState({ playerLeft:this.state.playerLeft -= 10 });
        this.props.dispatch(actions.moveRight('player'));
        this.setState({ playerLeft:this.state.playerLeft += 10 });
        this.props.dispatch(actions.attack('player', 
          myCats[this.props.catData.player.charInBattle].index, 
          theirCats[this.props.catData.enemy.charInBattle].index));
        this.swingWeapon(this.playerSword,'player');
        return;
     
      } else if(keys[37] && keys[39]) {
        this.props.dispatch(actions.moveLeft('player'));
        this.setState({ playerLeft:this.state.playerLeft -= 10 });
        this.props.dispatch(actions.moveRight('player'));
        this.setState({ playerLeft:this.state.playerLeft += 10 });
        return;
      } else if(keys[37] && keys[32]) {
        this.props.dispatch(actions.moveLeft('player'));
        this.setState({ playerLeft:this.state.playerLeft -= 10 });
        this.props.dispatch(actions.attack('player', 
          myCats[this.props.catData.player.charInBattle].index, 
          theirCats[this.props.catData.enemy.charInBattle].index));
        this.swingWeapon(this.playerSword,'player');
        return;
      } else if(keys[39] && keys[32]) {
        this.props.dispatch(actions.moveRight('player'));
        this.setState({ playerLeft:this.state.playerLeft += 10 });
        this.props.dispatch(actions.attack('player', 
          myCats[this.props.catData.player.charInBattle].index, 
          theirCats[this.props.catData.enemy.charInBattle].index));
        this.swingWeapon(this.playerSword,'player');
        return;
      } else if(keys[37]) {
        this.props.dispatch(actions.moveLeft('player'));
        this.setState({ playerLeft:this.state.playerLeft -= 10 });
        return;
      } else if(keys[39]) {
        this.props.dispatch(actions.moveRight('player'));
        this.setState({ playerLeft:this.state.playerLeft += 10 });
        return;
      } else if(keys[32]) {
        this.props.dispatch(actions.attack('player', 
          myCats[this.props.catData.player.charInBattle].index, 
          theirCats[this.props.catData.enemy.charInBattle].index));
          this.swingWeapon(this.playerSword, 'player');
        return;
      }
    };
  }
  // update logic for each time a hit point is changed
  componentDidUpdate () {
    ['player','enemy'].forEach((team) => {

      if(this.props.catData.battleStatus === 'MID_BATTLE' && _.values(this.props.catData[team].cards)[this.props.catData[team].charInBattle] && _.values(this.props.catData[team].cards)[this.props.catData[team].charInBattle].hp <= 0) {
        if(this.state[team]) {
          team === 'player' ? this.playerSword.toggleClass('hide_element') : this.enemySword.toggleClass('hide_element');
          let obj = {};
          obj[team] = false;
          this.setState(obj);
          setTimeout(() => {
            if(this.props.catData.battleStatus !== 'POST_BATTLE') {
              obj[team] = true;
              team === 'player' ? this.playerSword.toggleClass('hide_element') : this.enemySword.toggleClass('hide_element');
              this.setState(obj);
            }
          },1000);
        }
        if(this.props.catData[team].charInBattle === 2) {
          this.stopEnemy();
          let winner = team === 'player' ? 'enemy' : 'player';
          this.props.dispatch(actions.changeBattleStatus('POST_BATTLE', winner));
        }else{
          this.props.dispatch(actions.setCharInBattle(team, this.props.catData[team].charInBattle + 1));
        }
      }
    });
  }

  //uses jquery keyframe plugin to easily play and reset keyframe animations
  swingWeapon ($el, player) {
    if(player === 'player') {
      $el.playKeyframe(
        'swing_player .3s linear',
        () => $el.resetKeyframe()
      );
    } else {
      $el.playKeyframe(
        'swing_enemy .3s linear',
        () => $el.resetKeyframe()
      );
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
      return <Cat stats={ cat } key={ cat.index }/>;
    });
      
    const theirCats = _.map(this.props.catData.enemy.cards, (cat, i) => {
      initCat(cat);
      return <Cat stats={ cat } key={ cat.index }/>;
    });
    //uncomment input button field to clear enemy movement interval
    return (
      <div className='__Battle__' >
      {/*<input type="button" value="clearInterval" onClick={this.stopEnemy.bind(this)} />*/}
        <div className="well field">
          {
            this.state.player ? 
              <div className="player" style={{ left: this.props.catData.player.left + 'px' }}>{ myCats[this.props.catData.player.charInBattle] }</div> :
              <img className="explosion animated zoomIn" style={{ left:this.props.catData.player.left - 50 + 'px' }} src='./explosion.png' />
          }
          {
             this.state.enemy  ? 
              <div className="enemy" style={{ left: this.props.catData.enemy.left + 'px' }}>{ theirCats[this.props.catData.enemy.charInBattle] }</div> :
              <img className="explosion animated zoomIn" style={{ left:this.props.catData.enemy.left- 50 + 'px' }} src='./explosion.png' />
          }
          <img className="player_sword" src="./blue.png" style={{ left: this.props.catData.player.left + 85 + 'px' }} />
          <img className="enemy_sword" src='./red.png' style={{ left: this.props.catData.enemy.left + 20 + 'px' }}/>
        </div>
        <div className='baseline'>
          <div className="my_cats">
            { myCats }
          </div>
          <div className="filler"></div> 
          <div className="their_cats">
            { theirCats }
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