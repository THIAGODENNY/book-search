import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const Items = ({ items }) => (
  <ul>
    {items && items.map((item) => (
      <Item key={item.id} item={item} />
    ))}
  </ul>
);

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};

Items.defaultProps = {
  items: undefined,
};

export default Items;
