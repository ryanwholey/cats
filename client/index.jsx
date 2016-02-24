import React, { Component } from 'react';
import { render as Render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Content from './components/content/content.jsx';
import Header from './components/header/header.jsx';
import * as actions from './redux/actions';

class App extends Component {

  componentWillMount () {
    store.dispatch(actions.getPictures());
    store.dispatch(actions.getFacts());
  }

  render () {
    return(
      <div id="composedApp">
        <Header />
        <Content />
      </div>
    );
  }
}

Render (
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);

