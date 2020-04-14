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
      <a className="item__title" href={infoLink}>{title}</a>
      <div className="item__container">
        <input className="item__container__image" type="image" src={smallThumbnail || defaultImage} alt="Logo" onClick={() => addItemWishlist(id)} />
        <span className="item__container__description">{description}</span>
      </div>
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
