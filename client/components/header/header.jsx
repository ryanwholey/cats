import React, { Component } from 'react';
import './header.scss';
import * as kitten from './kittens_jumbo.jpg';

export default () => {
  return {
    render: () => {
      return (
        <div id="__header__" className="jumbotron">
          <h1 >Cats</h1>
          <h3> Cat facts for humans about cats!!</h3>
        </div>
      );
    }
  };
};


