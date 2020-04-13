import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import '../styles/components/Items.scss';

const Items = ({ items, addItemWishlist }) => (
  <div className="container-items">
    {items && items.map((item) => (
      <Item key={item.id} item={item} className="item" addItemWishlist={addItemWishlist} />
    ))}
  </div>
);

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
