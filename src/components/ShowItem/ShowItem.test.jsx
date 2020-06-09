import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import ShowItem from './ShowItem';
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
describe('ShowItem should render correcly', () => {
  it('loads and displays ShowItem', () => {
    const store = storeFactory(initialState());
    const { getByTestId } = render(
      <Provider store={store}>
        <ShowItem
          handleDelete={() => {}}
          id=""
        />
      </Provider>,
    );

    expect(getByTestId('show-item__body')).toBeInTheDocument();
    expect(getByTestId('show-item__body__description')).toBeInTheDocument();
    expect(getByTestId('item__body__description__title')).toBeInTheDocument();
    expect(getByTestId('show-item__body__description__authors')).toBeInTheDocument();
    expect(getByTestId('show-item__body__description__description')).toBeInTheDocument();
    expect(getByTestId('show-item__body__image')).toBeInTheDocument();
    expect(getByTestId('show-item__body__info')).toBeInTheDocument();
    expect(getByTestId('show-item__body__info__categories')).toBeInTheDocument();
    expect(getByTestId('show-item__body__info__pages')).toBeInTheDocument();
    expect(getByTestId('show-item__body__info__rating')).toBeInTheDocument();
    expect(getByTestId('show-item__body__info__language')).toBeInTheDocument();
    expect(getByTestId('show-item__body__submit-form')).toBeInTheDocument();
    expect(getByTestId('show-item__body__submit-form__submit')).toBeInTheDocument();
  });

  it('renders the component', () => {
    const store = storeFactory(initialState());
    const { baseElement } = render(
      <Provider store={store}>
        <ShowItem
          handleDelete={() => {}}
          id=""
        />
      </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('executes handleDelete onSubmit', () => {
    const store = storeFactory(initialState());
    const handleDelete = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <ShowItem
          handleDelete={handleDelete}
          id=""
        />
      </Provider>,
    );
    fireEvent.submit(getByTestId('show-item__body__submit-form'));
    expect(handleDelete).toHaveBeenCalled();
  });
});

describe('if it renders props', () => {
  let getByTestId;
  const randomText = `${Math.random()}`;
  beforeEach(() => {
    const store = storeFactory(initialState({
      wishList: {
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
          {
            id: '1',
          },
        ],
      },
    }));
    getByTestId = render(
      <Provider store={store}>
        <ShowItem
          handleDelete={() => {}}
          id="0"
        />
      </Provider>,
    ).getByTestId;
  });

  test('renders title', () => {
    expect(getByTestId('item__body__description__title')).toHaveTextContent(`title ${randomText}`);
  });
  test('renders authors', () => {
    expect(getByTestId('show-item__body__description__authors')).toHaveTextContent(`authors ${randomText}`);
  });
  test('renders description', () => {
    expect(getByTestId('show-item__body__description__description')).toHaveTextContent(`description ${randomText}`);
  });
  test('renders image', () => {
    expect(getByTestId('show-item__body__image').src).toEqual(`href ${randomText}`);
  });
  test('renders categories', () => {
    expect(getByTestId('show-item__body__info__categories')).toHaveTextContent(`categories ${randomText}`);
  });
  test('renders pages', () => {
    expect(getByTestId('show-item__body__info__pages')).toHaveTextContent(`pages ${randomText}`);
  });
  test('renders rating', () => {
    expect(getByTestId('show-item__body__info__rating')).toHaveTextContent(`averageRating ${randomText}`);
  });
  test('renders language', () => {
    expect(getByTestId('show-item__body__info__language')).toHaveTextContent(`language ${randomText}`);
  });
});
