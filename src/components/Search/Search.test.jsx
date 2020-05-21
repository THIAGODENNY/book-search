import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Search from './Search';

const mockStore = configureStore([]);
const setup = (props) => {
  const store = mockStore({
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

  return shallow(
    <Search
      store={store}
    />,
  )
    .dive()
    .dive();
};

describe('Search should render correctly ', () => {
  test('render search__search component', () => {
    const component = setup();
    const itemSearch = component.find('[className="search__search"]');
    expect(itemSearch.length).toBe(1);
  });
  test('render search__search--found component when search isn`t empty', () => {
    const component = setup({ search: 'fooBar' });
    const itemSearch = component.find('[className="search__search--found"]');
    expect(itemSearch.length).toBe(1);
  });
  test('render search__search__input-search component', () => {
    const component = setup();
    const itemSearch = component.find('[className="search__search__input-search"]');
    expect(itemSearch.length).toBe(1);
  });
});
