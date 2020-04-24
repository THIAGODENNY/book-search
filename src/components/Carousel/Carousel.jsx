import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import './Carousel.scss';

const Carousel = ({ items, showItems, stop }) => {
  const [imgNumber, setImgNumber] = useState(0);
  const [focus, setFocus] = useState(false);

  const urls = items.filter(
    (item) => item[0].id !== undefined,
  );

  const styles = {
    backgroundImage: urls[imgNumber] && urls[imgNumber].map((item) => `url(${item.volumeInfo.imageLinks.smallThumbnail})`).join(','),
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
  };

  const previousImage = () => {
    if (imgNumber === 0) {
      return setImgNumber((urls.length - 1));
    }
    return setImgNumber(imgNumber - 1);
  };

  const nextImage = () => {
    if (imgNumber === ((urls.length - 1))) {
      return setImgNumber(0);
    }
    return setImgNumber(imgNumber + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!focus && !stop) {
        nextImage();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  if (!urls[imgNumber] && imgNumber !== 0) {
    setImgNumber(0);
    return <div className="carousel__container" />;
  }

  if (!urls[imgNumber]) {
    return <div className="carousel__container" />;
  }

  return (
    <div className="carousel__container">
      <h1 className="carousel__title">{urls[imgNumber][0].listName}</h1>
      <div className="carousel" onMouseEnter={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
        <input type="button" className="carousel__back" onClick={previousImage} />
        <input type="button" className="carousel__image" style={styles} onClick={() => showItems(urls[imgNumber][0].listName)} />
        <input type="button" className="carousel__next" onClick={nextImage} />
      </div>
    </div>
  );
};

Carousel.propTypes = {
  items: Proptypes.arrayOf(Proptypes.object).isRequired,
  showItems: Proptypes.string.isRequired,
  stop: Proptypes.string.isRequired,
};

export default Carousel;
