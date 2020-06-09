import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './CreateList.scss';

const CreateList = ({ createListIsOpen, handleCreateListClose, handleSubmitNewList }) => (
  <Modal
    className="create-list"
    isOpen={createListIsOpen}
    onRequestClose={handleCreateListClose}
    ariaHideApp={false}
  >
    <form className="create-list__submit-form" onSubmit={handleSubmitNewList}>
      <h1>Write a list to create:</h1>
      <input type="text" name="list" required />
      <input className="create-list__submit-form__submit" type="submit" />
    </form>
  </Modal>
);

CreateList.propTypes = {
  createListIsOpen: PropTypes.bool.isRequired,
  handleCreateListClose: PropTypes.func.isRequired,
  handleSubmitNewList: PropTypes.func.isRequired,
};

export default CreateList;
