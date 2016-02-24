import React, { Component } from 'react';
import * as actions from './../../redux/actions';
import { connect } from 'react-redux';
import CatList from './../catList/catList.jsx';

import './content.scss';

class Content extends Component {

  handleClick () {
    this.props.dispatch(actions.getInitialData());
  }

  render () {
    return (
      <div id="__content__">
        <input type="button" value="changeState" onClick={this.handleClick.bind(this)} />
        <CatList />
      </div>
    );
  }
  
}

const select = (state) => {
  return {
    general: state.general
  };
};

export default connect(select)(Content);


