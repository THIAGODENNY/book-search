import React, { useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Items from '../Items';
import './Search.scss';
import SelectList from '../SelectList';
import arraysEqual from '../../../tools/arraysEqual';

function Search() {
  const dispatch = useDispatch();

  const {
    data,
    wishList,
    search,
    selectedOption,
    list,
    filter,
  } = useSelector((state) => state);

  const [
    setData,
    setWishlist,
    setSearch,
    setSelectedOption,
    setFilter,
    setAllList,
  ] = [
    (newData) => dispatch({ type: 'SET_DATA', data: newData }),
    (newWishList) => dispatch({ type: 'SET_WISHLIST', wishList: newWishList }),
    (newSearch) => dispatch({ type: 'SET_SEARCH', search: newSearch }),
    (newSelectedOption) => dispatch({ type: 'SET_SELECTED_OPTION', selectedOption: newSelectedOption }),
    (newFilter) => dispatch({ type: 'SET_FILTER', filter: newFilter }),
    (newList) => dispatch({ type: 'SET_ALL_LIST', setList: newList }),
  ];

  const fetchData = async (searchParameters) => {
    setData({ items: [] });
    if (searchParameters) {
      const result = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=${searchParameters}`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );
      const { items } = result.data;
      if (items) {
        setData({ items });
      }
    }
  };

  const searchHandle = (event) => {
    setSearch(event);
    fetchData(event);
  };

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
        setAllList(newAllList);
        setFilter(null);
      }
    },
  );

  const addItemWishlist = (id) => {
    setSelectedOption({ isOpened: true, id });
  };

  const onRequestClose = () => {
    setSelectedOption({ isOpened: false });
  };

  const removeItemWishList = (id) => {
    setWishlist({ items: wishList.items.filter((i) => i.id !== id) });
  };

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

  const handleFilter = (e) => {
    const selectedFilter = e.target.value;
    if (selectedFilter === 'null' || !selectedFilter) {
      setFilter(null);
    } else {
      setFilter(selectedFilter);
    }
  };

  const debounceInputClasses = [
    'search__search',
    'search__search--found',
  ];

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
          debounceTimeout={50}
          className="search__search__input-search"
          value={search}
        />
      </div>

      <div className="search__items">
        <div className="search__items__found">
          {data.items.length > 0 && <h1 className="search__items__found__title">Items found</h1>}
          <Items items={(() => filterData())()} addItemWishlist={addItemWishlist} />
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
                addItemWishlist={removeItemWishList}
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
