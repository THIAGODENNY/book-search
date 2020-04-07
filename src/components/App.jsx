import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import React from 'react';
import { Provider } from 'react-redux';
import Search from './Search';
import WishList from './WishList';

import store from '../store/store';

const NotFoundPage = () => (
  <div>
    <h1>Not Found</h1>
    <Link to="/">Go Home</Link>
  </div>
);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Search} exact />
        <Route path="/wishlist" component={WishList} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
