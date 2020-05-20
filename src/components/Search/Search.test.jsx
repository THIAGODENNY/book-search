import React from 'react';
import { shallow } from 'enzyme';
import { Search } from './Search';
import { storeFactory } from '../../tests/testUtils';


const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(
    <Search
      store={store}
      wishList={{ items: [] }}
      list={[]}
      data={[]}
      hasMoreItems={false}
      search=""
      selectedOption={{ isOpen: false, id: '' }}
    />,
  );
};

test('render search component', () => {
  const wrapper = setup();
  const item = wrapper.find('[className="search"]');
  expect(item.length).toBe(1);
});
