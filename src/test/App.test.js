import React from 'react';
import crypto from 'crypto';
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import moxios from 'moxios'
import sinon from 'sinon';
import App from '../App';
import axios from 'axios';
import { equal } from 'assert'

configure({ adapter: new Adapter() });

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length),
  },
});

describe('<App />', () => {
  it('should render App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate generatePhoneNumbers click', () => {
    const wrapper = shallow(<App />);

    wrapper.find('.generate-button').simulate('click');
    expect(wrapper.instance().state.randomNumberState.length > 0).toBeTruthy();
  });

  it('should handle sorting in ascending order', () => {
    const event = {
      target: {
        value: ''
      }
    };

    const wrapper = shallow(<App />);
    wrapper.find('.generate-button').simulate('click');
    const selectElement = wrapper.find('#select');

    event.target.value = 'ascending';
    selectElement.simulate('change', event);

    const expected = 'ascending';
    expect(wrapper.instance().state.selected).toBe(expected);
  });

  it('should handle sorting in descending order', () => {
    const event = {
      target: {
        value: ''
      }
    };

    const wrapper = shallow(<App />);
    wrapper.find('.generate-button').simulate('click');
    const selectElement = wrapper.find('#select');

    event.target.value = 'descending';
    selectElement.simulate('change', event);

    const expected = 'descending';
    expect(wrapper.instance().state.selected).toBe(expected);
  });

  it('should simulate clicking on save button', () => {
    const wrapper = shallow(<App />);
    wrapper.find('.generate-button').simulate('click');

    wrapper.find('.save-button').simulate('click');
  });
});

describe('Save action', () => {
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install()
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
  })

  it('should save phone numbers', function (done) {
    moxios.withMock(function () {
      let onFulfilled = sinon.spy()
      const requestdata = ["0804135987", "0801120456", "0801741388"];
      axios.post('/save', requestdata, { proxy: { host: '127.0.0.1', port: 80 } })
        .then(onFulfilled)

      moxios.wait(function () {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: {
            message: 'Phone numbers saved!'
          }
        }).then(function () {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });
});
