import React, { Component } from 'react';
import * as actions from './../../redux/actions';
import { connect } from 'react-redux';
import CatList from './../catList/catList.jsx';
import { buildCat } from './../../util.js';
import Hand from './../hand/hand.jsx';

import './content.scss';

class Content extends Component {


  render () {
    return (
      <div id="__content__" className="container">
        <div className="row">
          <Hand />
        </div>
        <div className="row">
          <CatList />
        </div>
      </div>
    );
  }

}

const select = (state) => {
  return {
    catData: state.catData
  };
};

export default connect(select)(Content);


