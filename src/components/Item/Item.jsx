import React from 'react';
import PropTypes from 'prop-types';
import './Item.scss';
import defaultImage from '../../assets/No-Image-Available.png';

const Item = ({ item, addItemWishlist }) => {
  const { id, volumeInfo } = item;
  const {
    imageLinks,
    title,
    infoLink,
    description,
  } = volumeInfo;
  const { smallThumbnail } = imageLinks || [undefined];

  return (
    <div key={id} className="item">
      <img
        className="item__image"
        type="image"
        src={smallThumbnail || defaultImage}
        alt="Logo"
      />
      <div className="item__content">
        <a className="item__content__title" href={infoLink}><strong>{title}</strong></a>
        <p className="item__content__description">{description}</p>
      </div>
      <button type="button" className="item__button" onClick={() => addItemWishlist(id)}>Add to list</button>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    volumeInfo: PropTypes.object,
    selfLink: PropTypes.string,
    searchInfo: PropTypes.object,
    description: PropTypes.string,
  }),
  volumeInfo: PropTypes.shape({
    imageLinks: PropTypes.string,
    title: PropTypes.string,
    infoLink: PropTypes.string,
  }),
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string,
  }),
  addItemWishlist: PropTypes.func.isRequired,
};

Item.defaultProps = {
  volumeInfo: undefined,
  imageLinks: undefined,
  item: {
    volumeInfo: {
      smallThumbnail: undefined,
    },
  },
};

export default Item;
