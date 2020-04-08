import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const InsertItem = ({
  isOpened,
  onRequestClose,
  handleSubmit,
  list,
  handleCreateList,
}) => (
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
);

InsertItem.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCreateList: PropTypes.string.isRequired,
};

export default InsertItem;
