import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './InsertItem.scss';
import defaultImage from '../../assets/No-Image-Available.png';

const InsertItem = ({
  isOpened,
  onRequestClose,
  handleSubmit,
  list,
  handleCreateList,
  selectedListItem,
  handleSelectedListChange,
  id,
}) => {
  const { data } = useSelector((state) => state);
  const item = data.items.filter((i) => i.id === id).pop();

  return (
    <Modal
      className="insert-item"
      isOpen={isOpened}
      contentLabel="Selected Option"
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      {item
        && (
          <div className="insert-item__body">
            <div className="insert-item__body__description">
              <h1 className="insert-item__body__description__title">{item.volumeInfo.title}</h1>
              <span className="insert-item__body__description__authors">{item.volumeInfo.authors}</span>
              <span className="insert-item__body__description__description">{item.volumeInfo.description}</span>
            </div>
            <input className="insert-item__body__image" type="image" src={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : defaultImage} alt="logo" />
            <div className="insert-item__body__info">
              <span className="insert-item__body__info__categories">{item.volumeInfo.categories}</span>
              <span className="insert-item__body__info__pages">
                Pages:
                {item.volumeInfo.pageCount}
              </span>
              <span className="insert-item__body__info__rating">
                Rating:
                {item.volumeInfo.averageRating}
              </span>
              <span className="insert-item__body__info__language">
                Language:
                {item.volumeInfo.language}
              </span>
            </div>
            <form className="insert-item__body__submit-form" onSubmit={handleSubmit}>
              <span className="insert-item__body__submit-form__title">Add to list:</span>
              <select className="insert-item__body__submit-form__list" id="list" name="list" value={selectedListItem} onChange={handleSelectedListChange} required>
                {list.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
              <button type="button" className="insert-item__body__submit-form__create-list" onClick={handleCreateList}>+</button>
              <input className="insert-item__body__submit-form__submit" type="submit" />
            </form>
          </div>
        )}
    </Modal>
  );
};

InsertItem.propTypes = {
  isOpened: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCreateList: PropTypes.func.isRequired,
  handleSelectedListChange: PropTypes.func.isRequired,
  selectedListItem: PropTypes.string,
  id: PropTypes.string.isRequired,
};

InsertItem.defaultProps = {
  isOpened: false,
  selectedListItem: undefined,
};

export default InsertItem;
