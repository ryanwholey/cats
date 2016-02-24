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
        <div className="inner">
          {this.props.stats.name}
          <div className="stats">
            <img className="pic" src={this.props.stats.pic} />
            <div className="fact"> {this.props.stats.fact} </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Cat;