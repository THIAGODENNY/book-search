import React from 'react';
import { shallow } from 'enzyme';
import Item from './Item';

const setup = () => shallow(<Item />);

test('render without error', () => {
  const wrapper = setup();
  const item = wrapper.find('[className="item"]');
  expect(item.length).toBe(1);
});

test('renders item__content', () => {
  const wrapper = setup();
  const itemContent = wrapper.find('[className="item__content"]');
  expect(itemContent.length).toBe(1);
});

test('renders item__content__title', () => {
  const wrapper = setup();
  const itemContentTitle = wrapper.find('[className="item__content__title"]');
  expect(itemContentTitle.length).toBe(1);
});

test('renders item__content__description', () => {
  const wrapper = setup();
  const itemContentDescription = wrapper.find('[className="item__content__description"]');
  expect(itemContentDescription.length).toBe(1);
});

test('renders item__button', () => {
  const wrapper = setup();
  const itemButton = wrapper.find('[className="item__button"]');
  expect(itemButton.length).toBe(1);
});
