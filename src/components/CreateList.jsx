import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const CreateList = ({ createListIsOpen, handleCreateListClose, handleSubmitNewList }) => (
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
);

CreateList.propTypes = {
  createListIsOpen: PropTypes.bool.isRequired,
  handleCreateListClose: PropTypes.func.isRequired,
  handleSubmitNewList: PropTypes.func.isRequired,
};

export default CreateList;
