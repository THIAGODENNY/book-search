import React from 'react';
import PropTypes from 'prop-types';
import './Item.scss';
import crypto from 'crypto';
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
    <div key={crypto.randomBytes(16).toString('hex')} data-testid="item" className="item">
      <img
        data-test="item__image"
        className="item__image"
        type="image"
        src={smallThumbnail || defaultImage}
        alt="Logo"
      />
      <div data-test="item__content" className="item__content">
        <a data-test="item__content__title" className="item__content__title" href={infoLink}><strong>{title}</strong></a>
        <p data-test="item__content__description" className="item__content__description">{description}</p>
      </div>
      <button data-test="item__button" type="button" className="item__button" onClick={() => addItemWishlist(id)}>Add to list</button>
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
  addItemWishlist: PropTypes.func,
};

Item.defaultProps = {
  volumeInfo: undefined,
  imageLinks: undefined,
  item: {
    id: '0',
    volumeInfo: {
      smallThumbnail: defaultImage,
    },
  },
  addItemWishlist: () => null,
};

export default Item;
