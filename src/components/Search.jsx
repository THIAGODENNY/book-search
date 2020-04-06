import React, { useState, useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import Items from './Items';
import '../styles/components/Search.css';

function Search() {
  const [data, setData] = useState({ items: [] });
  const [wishList, setWishlist] = useState({ items: JSON.parse(localStorage.getItem('items') || '[]') });
  const [search, setSearch] = useState();

  const fetchData = async (searchParameters) => {
    setData({ item: undefined });
    if (searchParameters) {
      const result = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=${searchParameters}`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );
      setData(result.data);
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
        {(search || wishList)
          && (
          <div className="items">
            <Items items={(() => filterData())()} addItemWishlist={addItemWishlist} />
          </div>
          )}
        {wishList
          && (
          <div className="items">
            <Items items={wishList.items} addItemWishlist={removeItemWishList} />
          </div>
          )}
      </div>

    </div>
  );
}
export default Search;
