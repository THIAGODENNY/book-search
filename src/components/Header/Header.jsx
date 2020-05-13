import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <NavLink className="header__link" exact to="/">Home</NavLink>
    <NavLink className="header__link" to="/wishlists">Lists</NavLink>
  </div>
);

export default Header;
