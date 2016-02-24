import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cat from './../cat/cat.jsx';

class CatList extends Component {

  render () {

    const cats = this.props.catData && this.props.catData.cards  ? 
      this.props.catData.cards.map((cat, i) => <Cat stats={cat} key={i}/>) : null;

    return (
      <div className='__CatList__'>
        <div className='board'>
        {cats}
        </div>
      </div>
    );
  }

};

const select = (state) => {
  console.log(state);
  return {
    catData : state.catData
  };
};

export default connect(select)(CatList);