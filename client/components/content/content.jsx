import React, { Component } from 'react';
import * as actions from './../../redux/actions';
import { connect } from 'react-redux';
import CatList from './../catList/catList.jsx';
import { buildCat } from './../../util.js';

import './content.scss';

class Content extends Component {


  render () {
    return (
      <div id="__content__" className="container">
        <div className="row">
          <div className="col-lg-12">
            hello
          </div>
        </div>
        <CatList />
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


