import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cat from './../cat/cat.jsx';
import _ from 'lodash';

import './catList.scss';

class CatList extends Component {
  render () {

    const cats = this.props.catData && this.props.catData.cards  ? 
      _.map(this.props.catData.cards, (cat, i) => {
        cat.height = 20;
        cat.width = 15;
        return <Cat stats={cat} key={i}/>
      }) : null;

    return (
      <div className='__CatList__'>
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

export default connect(select)(CatList);