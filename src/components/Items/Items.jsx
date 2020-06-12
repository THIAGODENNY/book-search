import React from 'react';
import PropTypes from 'prop-types';
import crypto from 'crypto';
import Item from '../Item';
import './Items.scss';

const Items = ({ items, addItemWishlist }) => {
  if (!items) {
    return <div className="component-items" />;
  }
  return (
    <div data-testid="component-items" className="component-items">
      {items && items.map((item) => (
        <Item key={crypto.randomBytes(16).toString('hex')} item={item} addItemWishlist={addItemWishlist} />
      ))}
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
  addItemWishlist: PropTypes.func.isRequired,
};

Items.defaultProps = {
  items: undefined,
};

export default Items;
