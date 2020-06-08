import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, connect } from 'react-redux';
import InsertItem from '../InsertItem';
import CreateList from '../CreateList';

import * as actionCreator from '../../redux/actions';

const SelectList = ({
  selectedOption,
  onRequestClose,
  updateList,
  updateSelectedOption,
  updateWishList,
  handleCreateListClose,
  handleCreateList,
}) => {
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

  const handleBlockScroll = () => {
    if (isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  useEffect(() => {
    handleBlockScroll();
  }, [isOpened]);

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
        id={id}
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
  selectedOption: PropTypes.shape({
    isOpened: PropTypes.bool,
    id: PropTypes.string,
  }).isRequired,
  onRequestClose: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  updateSelectedOption: PropTypes.func.isRequired,
  updateWishList: PropTypes.func.isRequired,
  handleCreateListClose: PropTypes.func.isRequired,
  handleCreateList: PropTypes.func.isRequired,
};

SelectList.defaults = {
  selectedOption: {
    isOpened: false,
    id: '',
  },
};

const mapDispatchToProps = (dispatch) => ({
  updateList: (event) => dispatch(actionCreator.updateList(event)),
  updateSelectedOption: (event) => dispatch(actionCreator.updateSelectedOption(event)),
  updateWishList: (event) => dispatch(actionCreator.updateWishList(event)),
  handleCreateListClose: (event) => dispatch(actionCreator.handleCreateListClose(event)),
  handleCreateList: (event) => dispatch(actionCreator.handleCreateList(event)),
});

export default connect(null, mapDispatchToProps)(SelectList);
