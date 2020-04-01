import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import Items from './Items';

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

  return (
    <div>
      <DebounceInput
        minLength={2}
        onChange={(event) => searchHandle(event.target.value)}
        debounceTimeout={300}
      />
      {search
      && (
      <div>
        <h1>{search}</h1>
        <Items items={data.items} />
      </div>
      )}
    </div>
  );
}
export default Search;
