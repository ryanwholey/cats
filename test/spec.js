import {expect} from 'chai';
import * as actions from './../client/redux/actions';
import reducer from './../client/redux/reducer';
import store from './../client/redux/store';
import request from 'request-promise';

describe('receive data', () => {

  it('should receive pics from server', (done) => {
    request('http://localhost:8000/pics')
      .then((response) => {
        expect(/image/.test(response)).to.be.true;
        done();
      })
      .catch((err) => {
        console.log(err);
        expect(false).to.be.true;
        done()
      });
  });

  it('should receive facts from server', (done) => {
    request('http://localhost:8000/facts')
      .then((response) => {
        expect(JSON.parse(response).facts.length).to.be.truthy
        // console.log(response.facts)
        // expect(response.facts.length).to.be.truthy
        done();
      })
      .catch((err) => {
        console.log(err);
        expect(false).to.be.true;
        done()
      });
    });

});