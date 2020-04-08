import React from 'react';
import '../styles/components/Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <Link className="header-links" to="/">Home</Link>
    <Link className="header-links" to="/wishlists">Wishlists</Link>
  </div>
);

export default Header;
