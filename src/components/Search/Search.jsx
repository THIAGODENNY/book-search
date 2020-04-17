import React, { useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Items from '../Items';
import './Search.scss';
import SelectList from '../SelectList';
import arraysEqual from '../../../tools/arraysEqual';

import {
  updateFilter,
  updateAllList,
  searchHandle,
  handleFilter,
  addItemWishlist,
  onRequestClose,
  removeItemWishList,
  getMorePages,
} from '../../redux/actions';


function Search() {
  const {
    data,
    wishList,
    search,
    selectedOption,
    list,
    filter,
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

  const filterData = () => {
    const { items } = wishList;

    if (items.length > 0 && data.items) {
      return data.items.filter((item) => items.filter(
        (wishListItem) => item.id === wishListItem.id,
      )
        .length === 0);
    }
    return data.items;
  };

  const debounceInputClasses = [
    'search__search',
    'search__search--found',
  ];

  const handleLoadMoreItems = () => {
    getMorePages();
  };

  return (
    <div className="search">
      <div className={
        (search || wishList.items.length > 0)
          ? debounceInputClasses[1]
          : debounceInputClasses[0]
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
        {wishList.items.length > 0
          && (
            <div className="search__items__wishlist">
              <div className="search__items__wishlist__header">
                <h1 className="search__items__wishlist__header__title">WishList</h1>
                <select className="search__items__wishlist__header__filter" onChange={handleFilter} value={filter}>
                  <option key="default" value="null">-- Filter --</option>
                  {list.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <Items
                items={wishList.items.filter((e) => (filter ? e.listName === filter : true))}
                addItemWishlist={
                  (id) => removeItemWishList(
                    wishList.items.filter((i) => i.id !== id),
                  )
                }
              />
            </div>
          )}
      </div>
      <SelectList
        selectedOption={selectedOption}
        onRequestClose={onRequestClose}
      />
    </div>
  );
}
export default Search;
