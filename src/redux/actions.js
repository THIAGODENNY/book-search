import axios from 'axios';

export const updateItemsData = (data) => ({ type: 'SET_DATA', data });
export const updateWishList = (wishList) => {
  localStorage.setItem('items', JSON.stringify(wishList.items));
  return ({ type: 'SET_WISHLIST', wishList });
};
export const updateSearch = (search) => ({ type: 'SET_SEARCH', search });
export const updateSelectedOption = (selectedOption) => ({ type: 'SET_SELECTED_OPTION', selectedOption });
export const updateFilter = (filter) => (dispatch) => dispatch({ type: 'SET_FILTER', filter });
export const updateAllList = (list) => (dispatch) => dispatch({ type: 'SET_ALL_LIST', list });
export const updateList = (list) => ({ type: 'SET_LIST', list });
export const updateCreateListIsOpen = (createListIsOpen) => ({ type: 'SET_CREATE_LIST_IS_OPEN', createListIsOpen });
export const resetPage = () => ({ type: 'RESET_PAGE' });
export const incrementPage = () => ({ type: 'INCREMENT_PAGE' });
export const updateHasMoreItems = (state) => {
  if (state) {
    return ({ type: 'SET_HAS_MORE_ITEMS' });
  }
  return ({ type: 'RESET_HAS_MORE_ITEMS' });
};

export const fetchData = async (dispatch, getState) => {
  const { page, data, search } = getState();
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
        dispatch(updateHasMoreItems(true));
        dispatch(updateItemsData({ items }));
      } else {
        const newItems = data.items.concat(items);
        dispatch(updateItemsData({ items: newItems }));
      }
      dispatch(incrementPage());
    } else {
      dispatch(updateHasMoreItems(false));
    }
  }
};

export const getMorePages = () => (dispatch, getState) => fetchData(dispatch, getState);

export const searchHandle = (event) => (dispatch) => {
  dispatch(updateItemsData({ items: [] }));
  dispatch(resetPage());
  dispatch(updateSearch(event));
  dispatch(fetchData);
};

export const handleFilter = (e) => {
  const selectedFilter = e.target.value;
  if (selectedFilter === 'null' || !selectedFilter) {
    updateFilter(null);
  } else {
    updateFilter(selectedFilter);
  }
};

export const addItemWishlist = (id) => (dispatch) => {
  dispatch(updateSelectedOption({ isOpened: true, id }));
};

export const onRequestClose = () => (dispatch) => dispatch(
  updateSelectedOption({ isOpened: false }),
);

export const removeItemWishList = (items) => (dispatch) => {
  dispatch(updateWishList({ items }));
};

export const handleCreateListClose = () => (dispatch) => {
  dispatch(updateCreateListIsOpen(false));
};

export const handleCreateList = (e) => (dispatch) => {
  e.preventDefault();
  dispatch(updateCreateListIsOpen(true));
};
