import React, { useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames';
import Items from '../Items';
import './Search.scss';
import SelectList from '../SelectList';
import arraysEqual from '../../../tools/arraysEqual';

import {
  updateFilter,
  updateAllList,
  searchHandle,
  addItemWishlist,
  onRequestClose,
  getMorePages,
} from '../../redux/actions';

function Search() {
  const {
    data,
    wishList,
    search,
    selectedOption,
    list,
    hasMoreItems,
  } = useSelector((state) => state);

  useEffect(
    () => {
      localStorage.setItem('items', JSON.stringify(wishList.items));
      localStorage.setItem('list', list.join(','));

      const wishListLists = wishList.items.map((item) => item.listName);
      const newAllList = [...new Set(wishListLists)];

      if (
        !arraysEqual(list, newAllList)
        && !selectedOption.isOpened
      ) {
        updateAllList(newAllList);
        updateFilter(null);
      }
    },
  );

  const handleLoadMoreItems = () => {
    getMorePages();
  };

  const filterData = () => {
    const { items } = wishList;

    if (items.length > 0 && data.items) {
      const itemsToLoad = data.items.filter((item) => items.filter(
        (wishListItem) => item.id === wishListItem.id,
      )
        .length === 0);
      if (data.items.length > 0 && itemsToLoad.length < 10 && hasMoreItems) {
        handleLoadMoreItems();
      }
      return itemsToLoad;
    }
    return data.items;
  };

  return (
    <div className="search">
      <div className={
        classNames({ search__search: !search, 'search__search--found': search })
      }
      >
        <DebounceInput
          minLength={2}
          onChange={(event) => searchHandle(event.target.value)}
          debounceTimeout={1000}
          className="search__search__input-search"
          value={search}
        />
      </div>

      <div className="search__items">
        <div className="search__items__found">
          {data.items.length > 0 && <h1 className="search__items__found__title">Items found</h1>}
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={() => handleLoadMoreItems()}
            hasMore={hasMoreItems}
            loader={data.items.length > 0 && <div className="loader" key={0}>Loading ...</div>}
          >
            <Items items={(() => filterData())()} addItemWishlist={addItemWishlist} />
          </InfiniteScroll>
        </div>
      </div>
      <SelectList
        selectedOption={selectedOption}
        onRequestClose={onRequestClose}
      />
    </div>
  );
}
export default Search;
