import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/components/SelectList.css';

const SelectList = ({ selectedOption, onRequestClose }) => {
  const { isOpened, id } = selectedOption;

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
    handleCreateListClose();
  };

  return (
    <div>
      <Modal
        className="modal"
        isOpen={isOpened}
        contentLabel="Selected Option"
        onRequestClose={onRequestClose}
      >
        <form className="submit-form" onSubmit={handleSubmit}>
          <h1>Choose a list to add:</h1>
          <select id="list" name="list">
            {list.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
          <button type="button" className="create-list" onClick={handleCreateList}>+</button>
          <input className="submit" type="submit" />
        </form>
      </Modal>
      <Modal
        className="modal"
        isOpen={createListIsOpen}
        onRequestClose={handleCreateListClose}
      >
        <form className="submit-form" onSubmit={handleSubmitNewList}>
          <h1>Write a list to create:</h1>
          <input type="text" name="list" />
          <input className="submit" type="submit" />
        </form>
      </Modal>
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
