import { createStore } from 'redux';

function wishList(state = {
  data: {
    items: [],
  },
  wishList: {
    items: JSON.parse(localStorage.getItem('items') || '[]'),
  },
  search: undefined,
  list: localStorage.getItem('list') ? localStorage.getItem('list').split(',') : [],
  selectedOption: {
    isOpen: false,
    id: undefined,
  },
  createListIsOpen: false,
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
    case 'SET_LIST':
      return {
        ...state,
        list: [...state.list, action.setList],
      };
    case 'SET_SELECTED_OPTION':
      return {
        ...state,
        selectedOption: action.selectedOption,
      };
    case 'SET_CREATE_LIST_IS_OPEN':
      return {
        ...state,
        createListIsOpen: action.createListIsOpen,
      };
    default:
      return state;
  }
}

const store = createStore(wishList);

export default store;
