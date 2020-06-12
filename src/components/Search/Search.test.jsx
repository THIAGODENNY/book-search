import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Search from './Search';
import { storeFactory } from '../../tests/storeFactory';

const mock = new MockAdapter(axios);

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

const setup = (props) => {
  const store = storeFactory(initialState(props));

  return render(
    <Provider store={store}>
      <Search />
    </Provider>,
  );
};

const response = () => ({
  items: [
    {
      id: '0',
      volumeInfo: {
        title: 'title',
        authors: 'authors',
        description: 'description',
        imageLinks: {
          smallThumbnail: 'href',
        },
        categories: 'categories',
        pageCount: 'pages',
        averageRating: 'averageRating',
        language: 'language',
      },
    },
  ],
});

describe('Search should render correctly ', () => {
  it('renders correclty', () => {
    const { baseElement } = setup({
      search: 'fooBar',
      data: {
        items: [
          {
            id: '0',
            volumeInfo: {
              title: 'title',
              authors: 'authors',
              description: 'description',
              imageLinks: {
                smallThumbnail: 'href',
              },
              categories: 'categories',
              pageCount: 'pages',
              averageRating: 'averageRating',
              language: 'language',
            },
          },
        ],
      },
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('render search component', () => {
    const { getByTestId } = setup();
    expect(getByTestId('search'));
  });

  it('render search__search component', () => {
    const { getByTestId } = setup(initialState());
    expect(getByTestId('search__search')).toHaveClass('search__search');
  });

  it('render search__search--found component when search isn`t empty', () => {
    const { getByTestId } = setup({ search: 'fooBar' });
    expect(getByTestId('search__search')).toHaveClass('search__search--found');
  });

  it('render search__search__input-search component', () => {
    const { getByTestId } = setup();
    expect(getByTestId('search__search__input-search')).toBeInTheDocument();
  });

  it('render search__items component', () => {
    const { getByTestId } = setup();
    expect(getByTestId('search__items')).toBeInTheDocument();
  });

  it('render search__items__found component', () => {
    const { getByTestId } = setup();
    expect(getByTestId('search__items__found')).toBeInTheDocument();
  });

  it('not render search__items__found__title when search is empty', () => {
    const { queryByTestId } = setup({ search: '', data: { items: [{ id: 'fooBar' }] } });
    expect(queryByTestId('search__items__found__title')).not.toBeInTheDocument();
  });

  it('not render search__items__found__title when data.items is empty', () => {
    const { queryByTestId } = setup({ search: 'fooBar', data: { items: [] } });
    expect(queryByTestId('search__items__found__title')).not.toBeInTheDocument();
  });

  it('render search__items__found__title when search and data.items isnt`t empty', () => {
    const randomText = `${Math.random()}`;
    const { getByTestId } = setup({
      search: 'fooBar',
      data: {
        items: [
          {
            id: '0',
            volumeInfo: {
              title: `title ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
        ],
      },
    });
    expect(getByTestId('search__items__found__title')).toBeInTheDocument();
  });

  it('render search__items__found__infinite__scroll when search isn`t empty', () => {
    const { getByTestId } = setup({ search: 'fooBar' });
    expect(getByTestId('search__items__found__infinite__scroll')).toBeInTheDocument();
  });

  it('not render search__items__found__infinite__scroll when search is empty', () => {
    const { queryByTestId } = setup({ search: '' });
    expect(queryByTestId('search__items__found__infinite__scroll')).not.toBeInTheDocument();
  });

  it('render item__select-list', () => {
    const { getByTestId } = setup();
    expect(getByTestId('select-list')).toBeInTheDocument();
  });

  it('render search__items__component not excluding wishlist items (wishlist empty)', () => {
    const randomText = `${Math.random()}`;
    const { getByTestId } = setup({
      search: 'fooBar',
      data: {
        items: [
          {
            id: '0',
            volumeInfo: {
              title: `title0 ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
          {
            id: '1',
            volumeInfo: {
              title: `title1 ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
          {
            id: '2',
            volumeInfo: {
              title: `title2 ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
          {
            id: '3',
            volumeInfo: {
              title: `title3 ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
        ],
      },
      wishList: {
        items: [
        ],
      },
    });

    expect(getByTestId('component-items')).toHaveTextContent(`title0 ${randomText}`);
    expect(getByTestId('component-items')).toHaveTextContent(`title1 ${randomText}`);
    expect(getByTestId('component-items')).toHaveTextContent(`title2 ${randomText}`);
    expect(getByTestId('component-items')).toHaveTextContent(`title3 ${randomText}`);
  });

  it('render search__items__component excluding wishlist items', () => {
    const apiUrl = 'https://www.googleapis.com';
    const path = new RegExp(`${apiUrl}/books/*`);

    mock
      .onGet(path)
      .reply(200, response());

    const randomText = `${Math.random()}`;
    const { getByTestId } = setup({
      search: 'fooBar',
      data: {
        items: [
          {
            id: '0',
            volumeInfo: {
              title: `title0 ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
          {
            id: '1',
            volumeInfo: {
              title: `title1 ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
          {
            id: '2',
            volumeInfo: {
              title: `title2 ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
          {
            id: '3',
            volumeInfo: {
              title: `title3 ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
        ],
      },
      wishList: {
        items: [
          {
            id: '1',
            volumeInfo: {
              title: `title1 ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
          {
            id: '3',
            volumeInfo: {
              title: `title3 ${randomText}`,
              authors: `authors ${randomText}`,
              description: `description ${randomText}`,
              imageLinks: {
                smallThumbnail: `href ${randomText}`,
              },
              categories: `categories ${randomText}`,
              pageCount: `pages ${randomText}`,
              averageRating: `averageRating ${randomText}`,
              language: `language ${randomText}`,
            },
          },
        ],
      },
    });

    expect(getByTestId('component-items')).toHaveTextContent(`title0 ${randomText}`);
    expect(getByTestId('component-items')).not.toHaveTextContent(`title1 ${randomText}`);
    expect(getByTestId('component-items')).toHaveTextContent(`title2 ${randomText}`);
    expect(getByTestId('component-items')).not.toHaveTextContent(`title3 ${randomText}`);
  });

  it('calls onChange on DebounceInput', async () => {
    const randomText = `${Math.random()}`;
    const apiUrl = 'https://www.googleapis.com';
    const path = new RegExp(`${apiUrl}/books/*`);
    mock
      .onGet(path)
      .reply(200, response());

    let store;
    const handleTest = jest.fn();
    const component = (search) => {
      store = storeFactory(initialState({ search }));
      return (
        <Provider store={store}>
          <Search test={handleTest} />
        </Provider>
      );
    };

    const { getByTestId } = render(component(''));

    expect(getByTestId('search__search__input-search').value).toEqual('');

    fireEvent.change(getByTestId('search__search__input-search'), { target: { value: `search ${randomText}` } });

    expect(getByTestId('search__search__input-search').value).toEqual(`search ${randomText}`);
  });
});
