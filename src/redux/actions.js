import axios from 'axios';
import store from './store';

const setData = (data) => ({ type: 'SET_DATA', data });
const setWishList = (wishList) => ({ type: 'SET_WISHLIST', wishList });
const setSearch = (search) => ({ type: 'SET_SEARCH', search });
const setSelectedOption = (selectedOption) => ({ type: 'SET_SELECTED_OPTION', selectedOption });
const setFilter = (filter) => ({ type: 'SET_FILTER', filter });
const setAllList = (list) => ({ type: 'SET_ALL_LIST', list });
const setList = (list) => ({ type: 'SET_LIST', list });
const setCreateListIsOpen = (createListIsOpen) => ({ type: 'SET_CREATE_LIST_IS_OPEN', createListIsOpen });
const setResetPage = () => ({ type: 'RESET_PAGE' });
const setIncrementPage = () => ({ type: 'INCREMENT_PAGE' });
const setHasMoreItems = () => ({ type: 'SET_HAS_MORE_ITEMS' });
const resetHasMoreItems = () => ({ type: 'RESET_HAS_MORE_ITEMS' });

export const updateItemsData = (item) => store.dispatch(setData(item));
export const updateWishList = (item) => {
  localStorage.setItem('items', JSON.stringify(item.items));
  store.dispatch(setWishList(item));
};
export const updateSearch = (item) => store.dispatch(setSearch(item));
export const updateSelectedOption = (option) => store.dispatch(setSelectedOption(option));
export const updateFilter = (filter) => store.dispatch(setFilter(filter));
export const updateAllList = (list) => store.dispatch(setAllList(list));
export const updateList = (list) => store.dispatch(setList(list));
export const updateCreateListIsOpen = (createListIsOpen) => store.dispatch(
  setCreateListIsOpen(createListIsOpen),
);
export const resetPage = () => store.dispatch(setResetPage());
export const incrementPage = () => store.dispatch(setIncrementPage());
export const updateHasMoreItems = (state) => {
  if (state) {
    return store.dispatch(setHasMoreItems());
  }
  return store.dispatch(resetHasMoreItems());
};

const fetchData = async () => {
  const { page, data, search } = store.getState();
  if (search) {
    const result = await axios(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${page}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    const { items } = result.data;
    if (items) {
      if (page === 0) {
        updateHasMoreItems(true);
        updateItemsData({ items });
      } else {
        const newItems = data.items.concat(items);
        updateItemsData({ items: newItems });
      }
      incrementPage();
    } else {
      updateHasMoreItems(false);
    }
  }
};

export const getMorePages = () => {
  fetchData();
};

export const searchHandle = (event) => {
  updateItemsData({ items: [] });
  resetPage();
  updateSearch(event);
  fetchData();
};

export const handleFilter = (e) => {
  const selectedFilter = e.target.value;
  if (selectedFilter === 'null' || !selectedFilter) {
    updateFilter(null);
  } else {
    updateFilter(selectedFilter);
  }
};

export const addItemWishlist = (id) => (updateSelectedOption({ isOpened: true, id }));
export const onRequestClose = () => (updateSelectedOption({ isOpened: false }));
export const removeItemWishList = (items) => (updateWishList({ items }));

export const handleCreateListClose = () => {
  updateCreateListIsOpen(false);
};

export const handleCreateList = (e) => {
  e.preventDefault();
  updateCreateListIsOpen(true);
};
