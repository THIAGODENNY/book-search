import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './WishList.scss';
import { updateFilter, updateAllList } from '../../redux/actions';
import arraysEqual from '../../../tools/arraysEqual';
import Carousel from '../Carousel';
import WishlistList from '../WishlistList/WishlistList';

class WishList extends Component {
  constructor() {
    super();
    this.state = {
      listName: undefined,
    };
  }

  componentDidUpdate() {
    const {
      wishList,
      list,
    } = this.props;

    localStorage.setItem('items', JSON.stringify(wishList.items));
    localStorage.setItem('list', list.join(','));

    const wishListLists = wishList.items.map((item) => item.listName);
    const newAllList = [...new Set(wishListLists)];

    if (!arraysEqual(list, newAllList)) {
      updateAllList(newAllList);
      updateFilter(null);
    }
  }

  render() {
    const { wishList, dispatch } = this.props;
    const { listName } = this.state;

    const setWishlist = (newWishList) => ({ type: 'SET_WISHLIST', wishList: newWishList });

    const handleShowItems = (list) => {
      this.setState({ listName: list });
    };

    const handleHideItems = () => {
      this.setState({ listName: undefined });
    };

    const removeItemWishList = (id, listNameToFilter) => {
      const removedWishlist = wishList.items.filter((i) => {
        if (id) {
          return i.id !== id;
        }
        return i.listName !== listNameToFilter;
      });
      dispatch(setWishlist({ items: removedWishlist }));

      const listExists = removedWishlist
        .filter((list) => list.listName === listName)
        .length !== 0;

      if (!listExists) {
        handleHideItems();
      }
    };

    const items = wishList.items.sort((a, b) => {
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
    }, []);

    return (
      <div>
        <Carousel
          items={items}
          showItems={handleShowItems}
          stop={listName}
          removeList={removeItemWishList}
        />
        <WishlistList
          showItems={listName}
          hideItems={handleHideItems}
          items={items}
          removeItem={removeItemWishList}
        />
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
  list: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  {
    wishList: state.wishList,
    list: state.list,
  }
);

export default connect(mapStateToProps)(WishList);
