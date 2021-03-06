import React from 'react';
import PropTypes, { object } from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import Items from '../Items';
import './Search.scss';
import SelectList from '../SelectList';
import arraysEqual from '../../../tools/arraysEqual';

import * as actionCreator from '../../redux/actions';

class Search extends React.PureComponent {
  componentDidMount() {
    this.update();
  }

  update() {
    const {
      wishList, list, searchActions,
    } = this.props;
    const { items } = wishList;

    localStorage.setItem('list', list.join(','));

    const wishListLists = items.map((item) => item.listName);
    const newAllList = [...new Set(wishListLists)];

    if (
      !arraysEqual(list, newAllList)
    ) {
      searchActions.updateAllList(newAllList);
      searchActions.updateFilter(null);
    }
  }

  filterData() {
    const {
      wishList,
      data,
      hasMoreItems,
      searchActions,
    } = this.props;


    const { items } = wishList;

    if (items.length > 0 && data.items) {
      const itemsToLoad = data.items.filter((item) => items.filter(
        (wishListItem) => item.id === wishListItem.id,
      )
        .length === 0);
      if (items.length > 0 && itemsToLoad.length < 10 && hasMoreItems) {
        searchActions.getMorePages();
      }
      return itemsToLoad;
    }
    return data.items;
  }

  render() {
    const {
      selectedOption,
      search,
      data,
      hasMoreItems,
      searchActions,
    } = this.props;

    return (
      <div data-test="search" className="search">
        <div className={
          classNames({ search__search: !search, 'search__search--found': search })
        }
        >
          <DebounceInput
            minLength={2}
            onChange={(event) => searchActions.searchHandle(event.target.value)}
            debounceTimeout={1000}
            data-search="search__search__input-search"
            className="search__search__input-search"
            value={search}
          />
        </div>

        <div data-test="search__items" className="search__items">
          <div data-test="search__items__found" className="search__items__found">
            {search
              && (
                <div>
                  {data.items.length > 0 && <h1 data-test="search__items__found__title" className="search__items__found__title">Items found</h1>}
                  <InfiniteScroll
                    data-test="search__items__found__infinite__scroll"
                    className="search__items__found__infinite__scroll"
                    initialLoad={false}
                    pageStart={0}
                    loadMore={searchActions.getMorePages}
                    hasMore={hasMoreItems}
                    loader={data.items.length > 0 && <div className="loader" key={0}>Loading ...</div>}
                  >
                    <Items data-test="search__items__component" items={(() => this.filterData())()} addItemWishlist={searchActions.addItemWishlist} />
                  </InfiniteScroll>
                </div>
              )}
          </div>
        </div>
        <SelectList
          data-test="item__select-list"
          className="item__select-list"
          selectedOption={selectedOption}
          onRequestClose={searchActions.onRequestClose}
        />
      </div>
    );
  }
}

Search.propTypes = {
  wishList: PropTypes.shape({
    items: PropTypes.arrayOf(object).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasMoreItems: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  selectedOption: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  searchActions: PropTypes.shape({
    getMorePages: PropTypes.func.isRequired,
    searchHandle: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    updateAllList: PropTypes.func.isRequired,
    addItemWishlist: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  }).isRequired,
};

Search.defaults = {
  selectedOption: {
    isOpen: false,
    id: '',
  },
};

const mapStateToProps = (state) => ({
  data: state.data,
  wishList: state.wishList,
  search: state.search,
  selectedOption: state.selectedOption,
  list: state.list,
  hasMoreItems: state.hasMoreItems,
});

const mapDispatchToProps = (dispatch) => ({
  searchActions: bindActionCreators(actionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
