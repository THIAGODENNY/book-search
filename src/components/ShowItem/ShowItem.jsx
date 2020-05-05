import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './ShowItem.scss';
import defaultImage from '../../assets/No-Image-Available.png';

const ShowItem = ({
  handleDelete,
  id,
}) => {
  const { wishList } = useSelector((state) => state);
  const item = wishList.items.filter((i) => i.id === id).pop();
  return (
    <div className="show-item__body">
      <div className="show-item__body__description">
        <h1 className="show-item__body__description__title">{item.volumeInfo.title}</h1>
        <span className="show-item__body__description__authors">{item.volumeInfo.authors}</span>
        <span className="show-item__body__description__description">{item.volumeInfo.description}</span>
      </div>
      <input className="show-item__body__image" type="image" src={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : defaultImage} alt="logo" />
      <div className="show-item__body__info">
        <span className="show-item__body__info__categories">{item.volumeInfo.categories}</span>
        <span className="show-item__body__info__pages">
          Pages:
          {item.volumeInfo.pageCount}
        </span>
        <span className="show-item__body__info__rating">
          Rating:
          {item.volumeInfo.averageRating}
        </span>
        <span className="show-item__body__info__language">
          Language:
          {item.volumeInfo.language}
        </span>
      </div>
      {
        true && (
          <form className="show-item__body__submit-form" onSubmit={handleDelete}>
            <input className="show-item__body__submit-form__submit" type="submit" value="Delete" />
          </form>
        )
      }
    </div>
  );
};

ShowItem.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ShowItem;
