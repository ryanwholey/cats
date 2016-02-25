import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cat from './../cat/cat.jsx';
import _ from 'lodash';
import * as actions from './../../redux/actions';
import './sword.png';
import './explosion.png'
import './battle.scss';

class Battle extends Component {
  constructor () {
    super();
    this.playerSword = null;
    this.myCats = null;
    this.theirCats = null;
    this.state = {
      playerLeft : 100,
      enemy: true,
      player: true
    }
  }

  componentDidMount () {
    this.playerSword = $('.player_sword');
    const keys = [];

    const myCats = _.values(this.props.catData.player.cards);
    const theirCats = _.values(this.props.catData.enemy.cards);

    window.onkeydown = window.onkeyup = (e) => {
      e = e || event;
      if(e.keyCode!==37 && e.keyCode!==39 && e.keyCode!==32){
        return 
      }
      keys[e.keyCode] = e.type === 'keydown';
      if(keys[37 && keys[39] && keys[32]]) {
        this.props.dispatch(actions.moveLeft());
        this.setState({playerLeft:this.state.playerLeft-=10})
        this.props.dispatch(actions.moveRight());
        this.setState({playerLeft:this.state.playerLeft+=10})
        this.props.dispatch(actions.attack('player', myCats[this.props.catData.player.charInBattle].index, theirCats[this.props.catData.enemy.charInBattle].index));
        this.swingWeapon(this.playerSword);
        return;
     
      } else if(keys[37] && keys[39]) {
        this.props.dispatch(actions.moveLeft());
        this.setState({playerLeft:this.state.playerLeft-=10})
        this.props.dispatch(actions.moveRight());
        this.setState({playerLeft:this.state.playerLeft+=10})
        return;
      } else if(keys[37] && keys[32]) {
        this.props.dispatch(actions.moveLeft());
        this.setState({playerLeft:this.state.playerLeft-=10})
        this.props.dispatch(actions.attack('player', myCats[this.props.catData.player.charInBattle].index, theirCats[this.props.catData.enemy.charInBattle].index));
        this.swingWeapon(this.playerSword);
        return;
      } else if(keys[39] && keys[32]) {
        this.props.dispatch(actions.moveRight());
        this.setState({playerLeft:this.state.playerLeft+=10})
        this.props.dispatch(actions.attack('player', myCats[this.props.catData.player.charInBattle].index, theirCats[this.props.catData.enemy.charInBattle].index));
        this.swingWeapon(this.playerSword);
        return;
      } 
       else if(keys[37]) {
        this.props.dispatch(actions.moveLeft());
        this.setState({playerLeft:this.state.playerLeft-=10})
        return;
      } else if(keys[39]) {
        this.props.dispatch(actions.moveRight());
        this.setState({playerLeft:this.state.playerLeft+=10})
        return;
      } else if(keys[32]) {
        this.props.dispatch(actions.attack('player', myCats[this.props.catData.player.charInBattle].index, theirCats[this.props.catData.enemy.charInBattle].index));
        this.swingWeapon(this.playerSword);
        return;
      }
    }
  }

  componentDidUpdate () {
    ['player','enemy'].forEach((team) => {
      // if(this.props.catData[team].charInBattle === 2 && _.values(this.props.catData[team].cards)[this.props.catData[team].charInBattle])
      console.log(`${team}cards`,this.props.catData[team].cards);
      console.log('inbattle',this.props.catData[team].charInBattle);

      try {
          console.log(_.values(this.props.catData[team].cards)[this.props.catData[team].charInBattle].hp);
      }
      catch(err) {
          console.log('caught');
      }
      if(_.values(this.props.catData[team].cards)[this.props.catData[team].charInBattle] && _.values(this.props.catData[team].cards)[this.props.catData[team].charInBattle].hp <= 0) {
        if(this.props.catData[team].charInBattle === 2) {
          alert('END OF GAME')
        }else{
          this.props.dispatch(actions.setCharInBattle(team, this.props.catData[team].charInBattle + 1) )
          if(this.state[team]){
            let obj = {}
            obj[team] = false;
            this.setState(obj);
            setTimeout(()=>{
              obj[team] = true;
              this.setState(obj);
            },1000)
          }
        }
      }
    })
  }

  swingWeapon ($el) {
    $el.playKeyframe(
        'swing_player .3s linear',
        () => $el.resetKeyframe()
    );
  }

  render () {
    console.log(this.state.enemy);
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
          <div className="player" style={{left: this.state.playerLeft + 'px'}}>{myCats[this.props.catData.player.charInBattle]}</div>
          <img id="player_sword" className="player_sword" style={{left: this.props.catData.player.left + 85 + 'px'}} src="./sword.png" />
          {
             this.state.enemy  ? 
            (
              <div>
                <div className="enemy" style={{left: this.props.catData.enemy.left + 'px'}}>{theirCats[this.props.catData.enemy.charInBattle]}</div>
                <img className="enemy_sword" src='./sword.png' style={{left: this.props.catData.enemy.left - 30 + 'px'}}/>
              </div>
            ) : <img className="explosion animated zoomIn" style={{left:this.props.catData.enemy.left}}src='./explosion.png' />
          }
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