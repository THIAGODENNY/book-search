import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import React from 'react';
import Search from './Search';

const WishList = () => <h1>Hello</h1>;

const NotFoundPage = () => (
  <div>
    <h1>Not Found</h1>
    <Link to="/">Go Home</Link>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Search} exact />
      <Route path="/wishlist" component={WishList} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
