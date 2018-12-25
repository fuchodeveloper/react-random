import React from 'react';
import crypto from 'crypto';
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import App from '../App';

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

  // complete test
  it('should simulate clicking on save button', () => {
    const wrapper = shallow(<App />);
    wrapper.find('.generate-button').simulate('click');

    wrapper.find('.save-button').simulate('click');
    // const spy = sinon.spy(App.prototype, 'saveAction');
    // console.log(wrapper.instance())
  });

  // complete test
  it('should call saveAction', async () => {
    try {
      const spy = sinon.spy(App.prototype.saveAction);
    const props = {
      saveAction: jest.fn(),
      error: {
        data: { message: '' }
      }
    }
      await shallow(<App {...props} saveAction={spy} />).instance().saveAction(['0808']);
      // console.log(wrapper)
    } catch (error) {
      console.log('error', error)
    }

  });
});
