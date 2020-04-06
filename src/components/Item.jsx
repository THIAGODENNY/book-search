import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Item.css';

const Item = ({ item, addItemWishlist }) => {
  const { id, volumeInfo } = item;
  const {
    imageLinks,
    title,
    infoLink,
    description,
  } = volumeInfo;
  const { smallThumbnail } = imageLinks || [undefined];

  const defaultUrl = 'https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png';

  return (
    <div key={id} className="item">
      <div className="card">
        <a href={infoLink}>{title}</a>
        <div className="container">
          <div className="container-image">
            <input className="item-image" type="image" src={smallThumbnail || defaultUrl} alt="Logo" onClick={() => addItemWishlist(id)} />
          </div>
          <div className="container-description">
            <span>{description}</span>
          </div>
        </div>
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
