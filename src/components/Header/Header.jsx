import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <Link className="header__link" to="/">Home</Link>
    <Link className="header__link" to="/wishlists">Wishlists</Link>
  </div>
);

export default Header;
