import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cat from './../cat/cat.jsx';

class CatList extends Component {

  render () {
    return (
      <div className='__CatList__'>
        <Cat />
      </div>
    );
  }

};

export default CatList;