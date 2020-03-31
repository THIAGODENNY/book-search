import React from 'react';
import { shallow } from 'enzyme';
import Hello from '../../components/Hello';

test('should render Hello correctly', () => {
  const wrapper = shallow(<Hello />);
  expect(wrapper.find('h1').length).toBe(1);
  expect(wrapper.find('h1').text()).toBe('Hello');
});
