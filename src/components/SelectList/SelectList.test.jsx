import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { storeFactory } from '../../tests/storeFactory';
import SelectList from './SelectList';
import '@testing-library/jest-dom';

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

describe('testing if components renders correcly', () => {
  it('renders correcly', () => {
    const randomText = 'fooBar';
    const store = storeFactory(initialState({
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
      createListIsOpen: true,
    }));
    const { baseElement } = render(
      <Provider store={store}>
        <SelectList
          selectedOption={{ id: '0', isOpened: true }}
          onRequestClose={() => {}}
          createListIsOpen
        />
      </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('tests if components renders correctly', () => {
    const randomText = `${Math.random()}`;
    const store = storeFactory(initialState({
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
      createListIsOpen: true,
    }));
    const { getByTestId } = render(
      <Provider store={store}>
        <SelectList
          selectedOption={{ id: '0', isOpened: true }}
          onRequestClose={() => {}}
          createListIsOpen
        />
      </Provider>,
    );

    expect(getByTestId('insert-item__body')).toBeInTheDocument();
    expect(getByTestId('create-list__submit-form')).toBeInTheDocument();
  });

  it('changes list on InsertList when submits on CreateList', () => {
    const randomText = `${Math.random()}`;
    const store = storeFactory(initialState({
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
      createListIsOpen: true,
    }));
    const { getByTestId } = render(
      <Provider store={store}>
        <SelectList
          selectedOption={{ id: '0', isOpened: true }}
          onRequestClose={() => {}}
          createListIsOpen
        />
      </Provider>,
    );
    fireEvent.change(getByTestId('create-list__submit-form__input'), { target: { value: `list ${randomText}` } });
    fireEvent.submit(getByTestId('create-list__submit-form'));
    expect(getByTestId('insert-item__body__submit-form__list')).toHaveTextContent(`list ${randomText}`);
  });

  it('blocks scroll when modal is opened', () => {
    const store = storeFactory();
    const component = (isOpened) => (
      <Provider store={store}>
        <SelectList
          selectedOption={{ id: '0', isOpened }}
          onRequestClose={() => {}}
          createListIsOpen
        />
      </Provider>
    );
    const { rerender } = render(
      component(false),
    );

    expect(document.body.style.overflow).toBe('unset');

    rerender(component(true));

    expect(document.body.style.overflow).toBe('hidden');
  });
});
