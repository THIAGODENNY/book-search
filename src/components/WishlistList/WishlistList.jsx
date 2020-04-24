import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './WishlistList.scss';
import Items from '../Items';

const WishlistList = ({
  showItems,
  hideItems,
  items,
  removeItem,
}) => {
  const theseItems = items.filter((item) => item[0].listName === showItems);

  return (
    <div>
      <Modal
        className="wishlist-list"
        isOpen={showItems}
        onRequestClose={hideItems}
      >
        <div className="wishlist-list__list">
          {theseItems && theseItems
            .map((item) => <Items items={item} addItemWishlist={removeItem} />)}
        </div>
      </Modal>
    </div>
  );
};

WishlistList.propTypes = {
  showItems: PropTypes.string.isRequired,
  hideItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default WishlistList;
