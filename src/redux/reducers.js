const initialState = {
  data: {
    items: [],
  },
  page: 0,
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
  hasMoreItems: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.data,
      };
    case 'INCREMENT_PAGE':
      return {
        ...state,
        page: state.page + 10,
      };
    case 'RESET_PAGE':
      return {
        ...state,
        page: 0,
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
        list: [...state.list, action.list],
      };
    case 'SET_ALL_LIST':
      return {
        ...state,
        list: action.list,
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
    case 'SET_HAS_MORE_ITEMS':
      return {
        ...state,
        hasMoreItems: true,
      };
    case 'RESET_HAS_MORE_ITEMS':
      return {
        ...state,
        hasMoreItems: false,
      };
    default:
      return state;
  }
};

export default reducer;
