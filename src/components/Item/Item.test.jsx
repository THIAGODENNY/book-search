import React from 'react';
import { shallow } from 'enzyme';
import Item from './Item';
import logoImage from '../../assets/No-Image-Available.png';

const setup = (item, addItemWishlist) => shallow(
  <Item
    item={item}
    addItemWishlist={addItemWishlist}
  />,
);

it('render without error', () => {
  const wrapper = setup();
  const item = wrapper.find('[data-test="item"]');
  expect(item.length).toBe(1);
});

describe('Item image should render correctly', () => {
  it('renders item__image', () => {
    const wrapper = setup();
    const itemImage = wrapper.find('[data-test="item__image"]');
    expect(itemImage.length).toBe(1);
  });

  it('renders no-image in item__image when has no image', () => {
    const wrapper = setup();
    const itemImage = wrapper.find('[data-test="item__image"]');
    expect(itemImage.find('img').prop('src')).toEqual(logoImage);
  });
});

describe('Item content should render correcly', () => {
  it('renders item__content', () => {
    const wrapper = setup();
    const itemContent = wrapper.find('[data-test="item__content"]');
    expect(itemContent.length).toBe(1);
  });

  it('renders title and description', () => {
    const wrapper = setup();
    const itemContent = wrapper.find('[data-test="item__content"]');
    expect(itemContent.props().children[0].props['data-test']).toEqual('item__content__title');
    expect(itemContent.props().children[1].props['data-test']).toEqual('item__content__description');
  });
});

describe('Item title should render correctly', () => {
  it('renders item__content__title', () => {
    const wrapper = setup();
    const itemContentTitle = wrapper.find('[data-test="item__content__title"]');
    expect(itemContentTitle.length).toBe(1);
  });

  it('renders title in item__content__title', () => {
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
    const itemContentTitle = wrapper.find('[data-test="item__content__title"]');
    expect(itemContentTitle.text()).toBe(randomTitle);
    expect(itemContentTitle.props().href).toBe(randomInfoLink);
  });
});

describe('Item description should render correctly', () => {
  it('renders item__content__description', () => {
    const wrapper = setup();
    const itemContentDescription = wrapper.find('[data-test="item__content__description"]');
    expect(itemContentDescription.length).toBe(1);
  });

  it('renders description in item__content__description', () => {
    const randomDescription = Math.random().toString();
    const item = {
      id: randomDescription,
      volumeInfo: {
        description: randomDescription,
      },
    };
    const wrapper = setup(item);
    const itemContentDescription = wrapper.find('[data-test="item__content__description"]');
    expect(itemContentDescription.text()).toBe(randomDescription);
  });
});

describe('Button should be rendered correctly', () => {
  it('renders item__button', () => {
    const wrapper = setup();
    const itemButton = wrapper.find('[data-test="item__button"]');
    expect(itemButton.length).toBe(1);
  });

  it('returns id when button clicks', () => {
    const randomId = Math.random().toString();
    const item = {
      id: randomId,
      volumeInfo: {
      },
    };
    const mockCallBack = jest.fn();
    const addItemWishlist = mockCallBack;
    const wrapper = setup(item, addItemWishlist);
    const itemButton = wrapper.find('[data-test="item__button"]');
    itemButton.simulate('click');
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(mockCallBack).toHaveBeenCalledWith(randomId);
  });
});
