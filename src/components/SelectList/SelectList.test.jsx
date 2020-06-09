import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { storeFactory } from '../../tests/storeFactory';
import SelectList from '.';

describe('testing if components renders correcly', () => {
  it('renders correcly', () => {
    const store = storeFactory();
    const { baseElement } = render(
      <Provider store={store}>
        <SelectList
          selectedOption={{ isOpened: true, id: '0' }}
          onRequestClose={() => {}}
        />
      </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
