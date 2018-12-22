import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('<App />', () => {
  const wrapper = shallow(<App />);
  console.log('wrapper', wrapper.debug())

  // it('should contain H2 element', () => {
  //   expect(wrapper.find('h2').length).toBe(1);
  // })
});
