import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/components/SelectList.scss';
import InsertItem from './InsertItem';
import CreateList from './CreateList';

const SelectList = ({ selectedOption, onRequestClose }) => {
  const { isOpened, id } = selectedOption;
  const [selectedListItem, setSelectedListItem] = useState();

  const dispatch = useDispatch();
  const {
    data,
    wishList,
    list,
    createListIsOpen,
  } = useSelector((state) => state);
  const [
    setWishlist,
    setSelectedOption,
    setList,
    setCreateListIsOpen,
  ] = [
    (newWishList) => dispatch({ type: 'SET_WISHLIST', wishList: newWishList }),
    (newSelectedOption) => dispatch({ type: 'SET_SELECTED_OPTION', selectedOption: newSelectedOption }),
    (newList) => dispatch({ type: 'SET_LIST', setList: newList }),
    (newCreateListIsOpen) => dispatch({ type: 'SET_CREATE_LIST_IS_OPEN', createListIsOpen: newCreateListIsOpen }),
  ];


  const handleSubmit = (e) => {
    e.preventDefault();

    const { items } = wishList;
    const item = data.items.filter((i) => i.id === id).pop();
    item.listName = e.target.list.value;

    if (items.filter((i) => i.id === id).length === 0) {
      setWishlist({ items: [...wishList.items, item] });
    }
    setSelectedOption({ isOpened: false });
  };

  const handleCreateList = (e) => {
    e.preventDefault();
    setCreateListIsOpen(true);
  };

  const handleCreateListClose = () => {
    setCreateListIsOpen(false);
  };

  const handleSubmitNewList = (e) => {
    e.preventDefault();
    const newListValue = e.target.elements.list.value;
    if (newListValue) {
      setList(newListValue);
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
