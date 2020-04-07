import { createStore } from 'redux';

function counter(state = {
  data: {
    items: [],
  },
  wishList: {
    items: JSON.parse(localStorage.getItem('items') || '[]'),
  },
  search: undefined,
}, action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.data,
      };
    case 'SET_WISHLIST':
      return {
        ...state,
        wishList: action.wishList,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
}

const store = createStore(counter);

export default store;
