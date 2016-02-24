import React, { Component } from 'react';
import './header.scss';
import * as kitten from './kittens_jumbo.jpg';

export default () => {
  return {
    render: () => {
      return (
        <div id="__header__" className="jumbotron">
          <h3 className="center-text">Cat facts for humans about cats!!</h3>
        </div>
      );
    }
  };
};


