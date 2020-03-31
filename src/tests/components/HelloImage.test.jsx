import React from 'react';
import { shallow } from 'enzyme';
import HelloImage from '../../components/HelloImage';

test('should render HelloImage correctly', () => {
  const wrapper = shallow(<HelloImage />);
  expect(wrapper.find('img').length).toBe(1);
  expect(wrapper.find('img').prop('alt')).toEqual('Logo');
});
