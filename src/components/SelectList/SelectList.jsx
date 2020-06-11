import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InsertItem from '../InsertItem';
import CreateList from '../CreateList';

import * as actionCreator from '../../redux/actions';

const SelectList = ({
  selectedOption,
  onRequestClose,
  data,
  wishList,
  list,
  createListIsOpen,
  selectActions,
}) => {
  const { isOpened, id } = selectedOption;

  const {
    updateList,
    updateSelectedOption,
    updateWishList,
    handleCreateListClose,
    handleCreateList,
  } = selectActions;

  const [selectedListItem, setSelectedListItem] = useState();

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
  data: PropTypes.shape({
    items: PropTypes.array,
  }).isRequired,
  wishList: PropTypes.shape({
    items: PropTypes.array,
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  createListIsOpen: PropTypes.bool.isRequired,
  selectActions: PropTypes.shape({
    updateList: PropTypes.func.isRequired,
    updateSelectedOption: PropTypes.func.isRequired,
    updateWishList: PropTypes.func.isRequired,
    handleCreateListClose: PropTypes.func.isRequired,
    handleCreateList: PropTypes.func.isRequired,
  }).isRequired,
};

SelectList.defaults = {
  selectedOption: {
    isOpened: false,
    id: '',
  },
};

const mapStateToProps = (state) => ({
  data: state.data,
  wishList: state.wishList,
  list: state.list,
  createListIsOpen: state.createListIsOpen,
});

const mapDispatchToProps = (dispatch) => ({
  selectActions: bindActionCreators(actionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectList);
