import React from 'react';
import { shallow } from 'enzyme';
import Item from './Item';

const setup = (item, addItemWishlist) => shallow(
  <Item
    item={item}
    addItemWishlist={addItemWishlist}
  />,
);

test('render without error', () => {
  const wrapper = setup();
  const item = wrapper.find('[className="item"]');
  expect(item.length).toBe(1);
});

describe('Item content should render correcly', () => {
  test('renders item__content', () => {
    const wrapper = setup();
    const itemContent = wrapper.find('[className="item__content"]');
    expect(itemContent.length).toBe(1);
  });
  test('renders title and description', () => {
    const wrapper = setup();
    const itemContent = wrapper.find('[className="item__content"]');
    expect(itemContent.props().children[0].props.className).toEqual('item__content__title');
    expect(itemContent.props().children[1].props.className).toEqual('item__content__description');
  });
});

describe('Item title should render correctly', () => {
  test('renders item__content__title', () => {
    const wrapper = setup();
    const itemContentTitle = wrapper.find('[className="item__content__title"]');
    expect(itemContentTitle.length).toBe(1);
  });

  test('renders title in item__content__title', () => {
    const randomTitle = Math.random().toString();
    const randomInfoLink = Math.random().toString();
    const item = {
      id: randomTitle,
      volumeInfo: {
        title: randomTitle,
        infoLink: randomInfoLink,
      },
    };
    const wrapper = setup(item);
    const itemContentTitle = wrapper.find('[className="item__content__title"]');
    expect(itemContentTitle.text()).toBe(randomTitle);
    expect(itemContentTitle.props().href).toBe(randomInfoLink);
  });
});

describe('Item description should render correctly', () => {
  test('renders item__content__description', () => {
    const wrapper = setup();
    const itemContentDescription = wrapper.find('[className="item__content__description"]');
    expect(itemContentDescription.length).toBe(1);
  });
  test('renders description in item__content__description', () => {
    const randomDescription = Math.random().toString();
    const item = {
      id: randomDescription,
      volumeInfo: {
        description: randomDescription,
      },
    };
    const wrapper = setup(item);
    const itemContentDescription = wrapper.find('[className="item__content__description"]');
    expect(itemContentDescription.text()).toBe(randomDescription);
  });
});

describe('Button should be rendered correcyly', () => {
  test('renders item__button', () => {
    const wrapper = setup();
    const itemButton = wrapper.find('[className="item__button"]');
    expect(itemButton.length).toBe(1);
  });

  test('returns id when button clicks', () => {
    const randomId = Math.random().toString();
    const item = {
      id: randomId,
      volumeInfo: {
      },
    };
    const mockCallBack = jest.fn();
    const addItemWishlist = mockCallBack;
    const wrapper = setup(item, addItemWishlist);
    const itemButton = wrapper.find('[className="item__button"]');
    itemButton.simulate('click');
    expect(mockCallBack.mock.calls[0][0]).toEqual(randomId);
  });
});
