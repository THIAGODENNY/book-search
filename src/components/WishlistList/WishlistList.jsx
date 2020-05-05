import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import './WishlistList.scss';
import ShowItem from '../ShowItem';

const WishlistList = ({
  showItems,
  hideItems,
  removeItem,
}) => (
  <Modal
    className="wishlist-list"
    isOpen={showItems}
    onRequestClose={hideItems}
  >
    <ShowItem
      id={showItems}
      handleDelete={() => removeItem(showItems)}
    />
  </Modal>
);

WishlistList.propTypes = {
  showItems: PropTypes.string.isRequired,
  hideItems: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default WishlistList;
