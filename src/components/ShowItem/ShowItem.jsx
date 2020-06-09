import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ShowItem.scss';
import defaultImage from '../../assets/No-Image-Available.png';

const ShowItem = ({
  handleDelete,
  id,
  wishList,
}) => {
  const item = wishList.items.filter((i) => i.id === id).pop();
  return (
    <div data-testid="show-item__body" className="show-item__body">
      <div data-testid="show-item__body__description" className="show-item__body__description">
        <h1 data-testid="item__body__description__title" className="show-item__body__description__title">{item && item.volumeInfo.title}</h1>
        <span data-testid="show-item__body__description__authors" className="show-item__body__description__authors">{item && item.volumeInfo.authors}</span>
        <span data-testid="show-item__body__description__description" className="show-item__body__description__description">{item && item.volumeInfo.description}</span>
      </div>
      <input data-testid="show-item__body__image" className="show-item__body__image" type="image" src={item && item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : defaultImage} alt="logo" />
      <div data-testid="show-item__body__info" className="show-item__body__info">
        <span data-testid="show-item__body__info__categories" className="show-item__body__info__categories">{item && item.volumeInfo.categories}</span>
        <span data-testid="show-item__body__info__pages" className="show-item__body__info__pages">
          Pages:
          {item && item.volumeInfo.pageCount}
        </span>
        <span data-testid="show-item__body__info__rating" className="show-item__body__info__rating">
          Rating:
          {item && item.volumeInfo.averageRating}
        </span>
        <span data-testid="show-item__body__info__language" className="show-item__body__info__language">
          Language:
          {item && item.volumeInfo.language}
        </span>
      </div>
      <form data-testid="show-item__body__submit-form" className="show-item__body__submit-form" onSubmit={handleDelete}>
        <input data-testid="show-item__body__submit-form__submit" className="show-item__body__submit-form__submit" type="submit" value="Delete" />
      </form>
    </div>
  );
};

ShowItem.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  wishList: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  wishList: state.wishList,
});

export default connect(mapStateToProps)(ShowItem);
