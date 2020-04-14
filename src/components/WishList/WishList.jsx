import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './WishList.scss';
import Item from '../Item';

class WishList extends Component {
  render() {
    const { wishList, dispatch } = this.props;
    const setWishlist = (newWishList) => ({ type: 'SET_WISHLIST', wishList: newWishList });

    const removeItemWishList = (id) => {
      dispatch(setWishlist({ items: wishList.items.filter((i) => i.id !== id) }));
    };

    return (
      <div className="wishlist">
        {wishList.items.sort((a, b) => {
          if (a.listName > b.listName) {
            return 1;
          }
          if (a.listName < b.listName) {
            return -1;
          }
          return 0;
        }).reduce((accumulator, currentElement) => {
          const index = accumulator
            .map((e, i) => (e[0].listName === currentElement.listName ? i : -1))
            .filter((e) => e > -1).pop();
          if (index === undefined) {
            return [...accumulator, [currentElement]];
          }
          return [...accumulator, [accumulator[index].push(currentElement)]];
        }, [])
          .map((e) => (
            e[0].id && (
              <div className="wishlist__items">
                <h1 className="wishlist__items__title">{`${e[0].listName}`}</h1>
                {e.map((i) => (
                  <Item key={i.id} item={i} addItemWishlist={removeItemWishList} />
                ))}
              </div>
            )
          ))}
      </div>
    );
  }
}

WishList.propTypes = {
  wishList: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state) => ({ wishList: state.wishList }))(WishList);
