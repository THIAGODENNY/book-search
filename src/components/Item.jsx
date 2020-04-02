import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Item.css';

const Item = ({ item }) => {
  const { id, selfLink, volumeInfo } = item;
  const { imageLinks, title } = volumeInfo;
  const { smallThumbnail } = imageLinks || [undefined];
  const defaultUrl = 'https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png';

  return (
    <div key={id} className="item">
      <div className="card">
        <a href={selfLink}>{title}</a>
        <img src={smallThumbnail || defaultUrl} alt="Logo" />
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    volumeInfo: PropTypes.object,
    selfLink: PropTypes.string,
  }),
  volumeInfo: PropTypes.shape({
    imageLinks: PropTypes.string,
    title: PropTypes.string,
  }),
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string,
  }),
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
