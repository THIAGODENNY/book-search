import React, { useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Items from './Items';
import '../styles/components/Search.css';

function Search() {
  const dispatch = useDispatch();

  const {
    data,
    wishList,
    search,
  } = useSelector((state) => state);

  const [setData, setWishlist, setSearch] = [
    (newData) => dispatch({ type: 'SET_DATA', data: newData }),
    (newWishList) => dispatch({ type: 'SET_WISHLIST', wishList: newWishList }),
    (newSearch) => dispatch({ type: 'SET_SEARCH', search: newSearch }),
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
    () => localStorage.setItem('items', JSON.stringify(wishList.items)),
  );

  const addItemWishlist = (id) => {
    const { items } = wishList;
    const item = data.items.filter((i) => i.id === id).pop();
    item.listName = 'testing 444444';

    if (items.filter((i) => i.id === id).length === 0) {
      setWishlist({ items: [...wishList.items, item] });
    }
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

  const debounceInputClasses = [
    'search',
    'search-found',
  ];

  return (
    <div className="app-container">
      <div className={
        (search || wishList.items.length > 0)
          ? debounceInputClasses[1]
          : debounceInputClasses[0]
      }
      >
        <DebounceInput
          minLength={2}
          onChange={(event) => searchHandle(event.target.value)}
          debounceTimeout={300}
          className="input-search"
        />
      </div>

      <div className="items-container">
        <div className="items">
          {data.items.length > 0 && <h1 className="title">Items found</h1>}
          <Items items={(() => filterData())()} addItemWishlist={addItemWishlist} />
        </div>
        {wishList.items.length > 0
          && (
          <div className="items">
            <div className="items-wishlist">
              <h1 className="title">WishList</h1>
              <Items items={wishList.items} addItemWishlist={removeItemWishList} />
            </div>
          </div>
          )}
      </div>
    </div>
  );
}
export default Search;
