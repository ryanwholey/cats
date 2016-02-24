import {expect} from 'chai';
import * as actions from './../client/redux/actions';
import reducer from './../client/redux/reducer';
import store from './../client/redux/store';

describe('redux', () => {
  it('actions should change state', (done) => {
    let word = 'mooose';
    store.dispatch(actions.changeState(word));
    setTimeout(() => {
      expect(store.getState().general.stateChange).to.equal(word);
      done();
    }, 50);
  });
});