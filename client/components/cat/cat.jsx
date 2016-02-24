import React, { Component } from 'react';
import { connect } from 'react-redux';
import './cat.scss';

class Cat extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    
    return (
      <div className="__Cat__">
        <img className="pic" src={this.props.stats.pic} />
        <div> {this.props.stats.fact} </div>
      </div>
    );
  }

}

export default Cat;