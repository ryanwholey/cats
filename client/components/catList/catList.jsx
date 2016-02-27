import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cat from './../cat/cat.jsx';
import { spliceFromAvailable } from './../../redux/actions';
import _ from 'lodash';
import './x.png';
import './catList.scss';

class CatList extends Component {
  
  removeCat (i) {
    this.props.dispatch(spliceFromAvailable(i));
  }

  render () {

    const cats = this.props.catData && this.props.catData.cards  ? 
      _.map(this.props.catData.cards, (cat, i) => {
        cat.height = 20;
        cat.width = 15;
        return(
          <div key={i} className="cat_container">
            <img onClick={this.removeCat.bind(this,i)} className="x" src="./x.png"/>
            <Cat stats={cat} key={i}/>
          </div>
         );
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