import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Search from './Search';
import { getMorePages } from '../../redux/actions';
import { storeFactory } from '../../tests/storeFactory';

const initialState = (props) => ({
  data: {
    items: [],
  },
  page: 0,
  wishList: {
    items: JSON.parse(localStorage.getItem('items') || '[]'),
  },
  search: '',
  list: [],
  selectedOption: {
    isOpen: false,
    id: '',
  },
  createListIsOpen: false,
  filter: undefined,
  hasMoreItems: true,
  ...props,
});

const mockStore = configureStore([]);
const setup = (props) => {
  const store = mockStore(initialState(props));

  return shallow(
    <Search
      store={store}
    />,
  )
    .dive()
    .dive();
};

describe('Search should render correctly ', () => {
  it('render search component', () => {
    const component = setup();
    const itemSearch = component.find('[data-test="search"]');
    expect(itemSearch.length).toBe(1);
  });

  it('render search__search component', () => {
    const component = setup();
    const itemSearch = component.find('[className="search__search"]');
    expect(itemSearch.length).toBe(1);
  });
  it('render search__search--found component when search isn`t empty', () => {
    const component = setup({ search: 'fooBar' });
    const itemSearch = component.find('[className="search__search--found"]');
    expect(itemSearch.length).toBe(1);
  });
  it('render search__search__input-search component', () => {
    const component = setup();
    const itemSearch = component.find('[className="search__search__input-search"]');
    expect(itemSearch.length).toBe(1);
  });

  it('render search__items component', () => {
    const component = setup();
    const itemSearch = component.find('[data-test="search__items"]');
    expect(itemSearch.length).toBe(1);
  });

  it('render search__items__found component', () => {
    const component = setup();
    const itemSearch = component.find('[data-test="search__items__found"]');
    expect(itemSearch.length).toBe(1);
  });

  it('not render search__items__found__title when search is empty', () => {
    const component = setup({ search: '', data: { items: [{ id: 'fooBar' }] } });
    const itemSearch = component.find('[data-test="search__items__found__title"]');
    expect(itemSearch.length).toBe(0);
  });

  it('not render search__items__found__title when data.items is empty', () => {
    const component = setup({ search: 'fooBar', data: { items: [] } });
    const itemSearch = component.find('[data-test="search__items__found__title"]');
    expect(itemSearch.length).toBe(0);
  });

  it('render search__items__found__title when search and data.items isnt`t empty', () => {
    const component = setup({ search: 'fooBar', data: { items: [{ id: 'fooBar' }] } });
    const itemSearch = component.find('[data-test="search__items__found__title"]');
    expect(itemSearch.length).toBe(1);
  });

  it('render search__items__found__infinite__scroll when search isn`t empty', () => {
    const component = setup({ search: 'fooBar' });
    const itemSearch = component.find('[data-test="search__items__found__infinite__scroll"]');
    expect(itemSearch.length).toBe(1);
  });

  it('not render search__items__found__infinite__scroll when search is empty', () => {
    const component = setup({ search: '' });
    const itemSearch = component.find('[data-test="search__items__found__infinite__scroll"]');
    expect(itemSearch.length).toBe(0);
  });

  it('render item__select-list', () => {
    const component = setup();
    const itemSearch = component.find('[data-test="item__select-list"]');
    expect(itemSearch.length).toBe(1);
  });

  it('render search__items__component not excluding wishlist items (wishlist empty)', () => {
    const component = setup({
      search: 'fooBar',
      data: {
        items: [
          { id: '1' },
          { id: '2' },
          { id: '3' },
          { id: '4' },
        ],
      },
      wishList: {
        items: [
        ],
      },
    });
    const itemSearch = component.find('[data-test="search__items__component"]');
    expect(itemSearch.props().items)
      .toEqual([
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
      ]);
  });

  it('render search__items__component excluding wishlist items', async () => {
    const storeRedux = storeFactory(initialState({
      search: 'fooBar',
      data: {
        items: [
          { id: '1' },
          { id: '2' },
          { id: '3' },
          { id: '4' },
        ],
      },
      wishList: {
        items: [
          { id: '1' },
          { id: '3' },
        ],
      },
    }));

    const component = shallow(
      <Search store={storeRedux} />,
    )
      .dive()
      .dive();

    const itemSearch = component.find('[data-test="search__items__component"]');
    expect(itemSearch.props().items)
      .toEqual([
        { id: '2' },
        { id: '4' },
      ]);
  });

  it('Scroll Infinite Scroll and call to getMorePages', async () => {
    const storeRedux = storeFactory(initialState({ search: 'fooBar' }));
    storeRedux.dispatch = jest.fn();
    const component = shallow(
      <Search store={storeRedux} />,
    )
      .dive()
      .dive();

    const itemSearch = component.find('InfiniteScroll');

    itemSearch.dive().instance().props.loadMore();

    expect(itemSearch.length).toBe(1);
    expect(storeRedux.dispatch).toHaveBeenCalledTimes(1);
    expect(storeRedux.dispatch.mock.calls[0][0].toString()).toBe(
      getMorePages().toString(),
    );
  });

  it('If not Scroll Infinite Scroll, no calls on getMorePages', async () => {
    const storeRedux = storeFactory(initialState({ search: 'fooBar' }));
    storeRedux.dispatch = jest.fn();
    const component = shallow(
      <Search store={storeRedux} />,
    )
      .dive()
      .dive();

    const itemSearch = component.find('InfiniteScroll');

    expect(itemSearch.length).toBe(1);
    expect(storeRedux.dispatch).toHaveBeenCalledTimes(0);
    expect(storeRedux.dispatch).not.toHaveBeenCalledWith(
      getMorePages,
    );
  });

  it('Changes redux items state when Scrolling Infinite Scroll', async () => {
    const storeRedux = storeFactory(initialState({ search: 'fooBar' }));
    const component = shallow(
      <Search store={storeRedux} />,
    )
      .dive()
      .dive();

    const mock = new MockAdapter(axios);
    const response = {
      items: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    };

    mock
      .onGet('https://www.googleapis.com/books/v1/volumes?q=fooBar&startIndex=0')
      .reply(200, response);

    const itemSearch = component.find('InfiniteScroll');
    await itemSearch.dive().instance().props.loadMore();
    await component.update();
    expect(storeRedux.getState().search).toBe('fooBar');
    expect(storeRedux.getState().data).toEqual(response);
  });
});
