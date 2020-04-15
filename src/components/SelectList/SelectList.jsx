import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import InsertItem from '../InsertItem';
import CreateList from '../CreateList';
import {
  updateWishList,
  updateSelectedOption,
  updateList,
  handleCreateListClose,
  handleCreateList,
} from '../../redux/actions';

const SelectList = ({ selectedOption, onRequestClose }) => {
  const { isOpened, id } = selectedOption;
  const [selectedListItem, setSelectedListItem] = useState();

  const {
    data,
    wishList,
    list,
    createListIsOpen,
  } = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { items } = wishList;
    const item = data.items.filter((i) => i.id === id).pop();
    item.listName = e.target.list.value;

    if (items.filter((i) => i.id === id).length === 0) {
      updateWishList({ items: [...wishList.items, item] });
    }
    updateSelectedOption({ isOpened: false });
  };

  const handleSubmitNewList = (e) => {
    e.preventDefault();
    const newListValue = e.target.elements.list.value;
    if (newListValue) {
      updateList(newListValue);
    }
    setSelectedListItem(newListValue);
    handleCreateListClose();
  };

  const handleSelectedListChange = (e) => setSelectedListItem(e.target.value);

  return (
    <div>
      <InsertItem
        isOpened={isOpened}
        onRequestClose={onRequestClose}
        handleSubmit={handleSubmit}
        list={list}
        handleCreateList={handleCreateList}
        selectedListItem={selectedListItem}
        handleSelectedListChange={handleSelectedListChange}
      />
      <CreateList
        createListIsOpen={createListIsOpen}
        handleCreateListClose={handleCreateListClose}
        handleSubmitNewList={handleSubmitNewList}
      />
    </div>
  );
};

SelectList.propTypes = {
  selectedOption: PropTypes.arrayOf(
    PropTypes.shape({
      isOpened: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default SelectList;
