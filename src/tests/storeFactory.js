import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';

const middleware = [thunk];

export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

export default storeFactory;
