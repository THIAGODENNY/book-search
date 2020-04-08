import React, { useState, useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Items from './Items';
import '../styles/components/Search.css';
import SelectList from './SelectList';

function Search() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState();

  const {
    data,
    wishList,
    search,
    selectedOption,
    list,
  } = useSelector((state) => state);

  console.log(search);

  const [
    setData,
    setWishlist,
    setSearch,
    setSelectedOption,
  ] = [
    (newData) => dispatch({ type: 'SET_DATA', data: newData }),
    (newWishList) => dispatch({ type: 'SET_WISHLIST', wishList: newWishList }),
    (newSearch) => dispatch({ type: 'SET_SEARCH', search: newSearch }),
    (newSelectedOption) => dispatch({ type: 'SET_SELECTED_OPTION', selectedOption: newSelectedOption }),
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
    if (selectedFilter === 'null') {
      setFilter(null);
    } else {
      setFilter(selectedFilter);
    }
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
          value={search}
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
                <div className="items-wishlist-title">
                  <h1 className="title">WishList</h1>
                  <select className="items-wishlist-filter" onChange={handleFilter}>
                    <option key="default" value="null">-- Filter --</option>
                    {list.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <Items
                  items={wishList.items.filter((e) => (filter ? e.listName === filter : true))}
                  addItemWishlist={removeItemWishList}
                />
              </div>
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
