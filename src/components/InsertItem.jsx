import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import '../styles/components/InsertItem.scss';

const InsertItem = ({
  isOpened,
  onRequestClose,
  handleSubmit,
  list,
  handleCreateList,
  selectedListItem,
  handleSelectedListChange,
}) => (
  <Modal
    className="insert-item"
    isOpen={isOpened}
    contentLabel="Selected Option"
    onRequestClose={onRequestClose}
  >
    <form className="insert-item__submit-form" onSubmit={handleSubmit}>
      <h1>Choose a list to add:</h1>
      <select id="list" name="list" value={selectedListItem} onChange={handleSelectedListChange}>
        {list.map((e) => <option key={e} value={e}>{e}</option>)}
      </select>
      <button type="button" className="insert-item__submit-form__create-list" onClick={handleCreateList}>+</button>
      <input className="insert-item__submit-form__submit" type="submit" />
    </form>
  </Modal>
);

InsertItem.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCreateList: PropTypes.string.isRequired,
  handleSelectedListChange: PropTypes.func.isRequired,
  selectedListItem: PropTypes.string,
};

InsertItem.defaultProps = {
  selectedListItem: undefined,
};

export default InsertItem;
