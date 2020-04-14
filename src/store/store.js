import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

function wishList(state = {
  data: {
    items: [],
  },
  wishList: {
    items: JSON.parse(localStorage.getItem('items') || '[]'),
  },
  search: undefined,
  list: [],
  selectedOption: {
    isOpen: false,
    id: undefined,
  },
  createListIsOpen: false,
  filter: undefined,
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
    case 'SET_ALL_LIST':
      return {
        ...state,
        list: action.setList,
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
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
}

const store = createStore(wishList, composeWithDevTools());

export default store;
