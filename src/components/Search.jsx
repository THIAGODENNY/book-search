import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import Items from './Items';
import '../styles/components/Search.css';

function Search() {
  const [data, setData] = useState({ items: [] });
  const [search, setSearch] = useState();

  const fetchData = async (searchParameters) => {
    setData({ item: undefined });
    if (searchParameters) {
      const result = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=${searchParameters}`,
      );
      setData(result.data);
    }
  };

  const searchHandle = (event) => {
    setSearch(event);
    fetchData(event);
  };

  const debounceInputClasses = [
    'search',
    'search-found',
  ];

  return (
    <div className={search ? debounceInputClasses.join(' ') : debounceInputClasses[0]}>
      <DebounceInput
        minLength={2}
        onChange={(event) => searchHandle(event.target.value)}
        debounceTimeout={300}
        className="input-search"
      />
      {search
      && (
      <div>
        <Items items={data.items} />
      </div>
      )}
    </div>
  );
}
export default Search;
