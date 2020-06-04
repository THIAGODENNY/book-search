import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './WishList.scss';
import * as actionCreator from '../../redux/actions';
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
      updateFilter,
      updateAllList,
    } = this.props;

    localStorage.setItem('list', list.join(','));

    const wishListLists = wishList.items.map((item) => item.listName);
    const newAllList = [...new Set(wishListLists)];

    if (!arraysEqual(list, newAllList)) {
      updateAllList(newAllList);
      updateFilter(null);
    }
  }

  render() {
    const { wishList, updateWishList } = this.props;
    const { listName } = this.state;

    const handleShowItems = (list) => {
      this.setState({ listName: list });
      document.body.style.overflow = 'hidden';
    };

    const handleHideItems = () => {
      this.setState({ listName: undefined });
      document.body.style.overflow = 'unset';
    };

    const removeItemWishList = (id, listNameToFilter) => {
      const removedWishlist = wishList.items.filter((i) => {
        if (id) {
          return i.id !== id;
        }
        return i.listName !== listNameToFilter;
      });
      updateWishList({ items: removedWishlist });

      const listExists = removedWishlist
        .filter((list) => list.listName === listName)
        .length !== 0;

      if (!listExists) {
        handleHideItems();
      }
    };

    const sortWishlist = (a, b) => {
      if (a.listName > b.listName) {
        return 1;
      }
      if (a.listName < b.listName) {
        return -1;
      }
      return 0;
    };

    const organizeToCommonLists = (accumulator, currentElement) => {
      const index = accumulator
        .map((e, i) => (e[0].listName === currentElement.listName ? i : -1))
        .filter((e) => e > -1).pop();
      if (index === undefined) {
        return [...accumulator, [currentElement]];
      }
      return [...accumulator, [accumulator[index].push(currentElement)]];
    };

    const items = wishList.items
      .sort(sortWishlist)
      .reduce(organizeToCommonLists, [])
      .filter(
        (item) => item[0].id !== undefined,
      );

    return (
      <div className="wishlist">
        {items && items.map((item) => (
          <Carousel
            items={item}
            showItems={handleShowItems}
            stop={listName}
            removeList={removeItemWishList}
          />
        ))}
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
  updateFilter: PropTypes.func.isRequired,
  updateAllList: PropTypes.func.isRequired,
  updateWishList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wishList: state.wishList,
  list: state.list,
});

const mapDispatchToProps = (dispatch) => ({
  updateFilter: (event) => dispatch(actionCreator.updateFilter(event)),
  updateAllList: (event) => dispatch(actionCreator.updateAllList(event)),
  updateWishList: (event) => dispatch(actionCreator.updateWishList(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
