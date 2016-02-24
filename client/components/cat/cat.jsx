import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentChoice } from './../../redux/actions';
import store from './../../redux/store';
import './cat.scss';
import './sword.png';
import './heart.png';


class Cat extends Component {

  constructor (props) {
    super(props);
  }

  drag (ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target, this.props);
    store.dispatch(currentChoice(this.props.stats.index));
  }

  render () {
    return (
      <div className="__Cat__ container" draggable="true" onDragStart={this.drag.bind(this)}>
        <div id="inner" className="row inner">

          <div className="row">
            <div className="col-lg-11">
              <div>{this.props.stats.name}</div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-11, img_container">
              <div className="img" style={{ backgroundImage: 'url(' + this.props.stats.pic + ')' }}></div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-11">
              <div className="fact">{this.props.stats.fact}</div>
            </div>
          </div>

         <div className="row stats_container">
            
            <div className="stats_bar">
              <img className="icon" src='./sword.png' />
              <div>{this.props.stats.show ? this.props.stats.at : '?'} </div>
              <img className="icon" src='./heart.png' />
              <div> {this.props.stats.show ? this.props.stats.hp : '?'} </div>
            </div>
        </div>

        </div>
      </div>
    );
  }
}

export default Cat;
