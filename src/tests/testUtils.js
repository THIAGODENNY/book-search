import { createStore } from 'redux';

import rootReducer from '../redux/reducers';

export const storeFactory = (initialState) => {
  createStore(rootReducer, initialState);
};

export default null;
