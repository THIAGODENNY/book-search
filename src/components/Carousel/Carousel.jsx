import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import './Carousel.scss';
import Modal from 'react-modal';

const Carousel = ({
  items, showItems, stop, removeList,
}) => {
  const [imgNumber, setImgNumber] = useState(0);
  const [focus, setFocus] = useState(false);
  const [deleteListOpened, setDeleteListOpened] = useState(false);

  const urls = items;
  const styles = {
    backgroundImage: `url(${urls[imgNumber].volumeInfo.imageLinks.smallThumbnail})`,
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

  const deleteListOpen = () => setDeleteListOpened(true);
  const deleteListClose = () => setDeleteListOpened(false);

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

  const handleRemoveList = () => {
    deleteListClose();
    removeList(null, urls[imgNumber].listName);
  };

  return (
    <div className="carousel__container">
      <div className="carousel__header">
        <button
          className="carousel__header__remove"
          type="button"
          onClick={deleteListOpen}
        >
          X
        </button>
        <h1 className="carousel__header__title">{urls[imgNumber].listName}</h1>
      </div>
      <div className="carousel" onMouseEnter={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
        <input type="button" className="carousel__back" onClick={previousImage} />
        <input type="button" className="carousel__image" style={styles} onClick={() => showItems(urls[imgNumber].listName)} />
        <input type="button" className="carousel__next" onClick={nextImage} />
      </div>
      <Modal
        className="carousel__confirmation"
        isOpen={deleteListOpened}
        onRequestClose={deleteListClose}
      >
        <form className="carousel__confirmation__submit-form" onSubmit={handleRemoveList}>
          <p>
            Write (
            <strong className="carousel__confirmation__word">
              {urls[imgNumber].listName}
            </strong>
            ) to delete:
          </p>
          <input type="text" name="list" pattern={`(${urls[imgNumber].listName})`} required />
          <input className="carousel__confirmation__submit-form__submit" type="submit" />
        </form>
      </Modal>
    </div>
  );
};

Carousel.propTypes = {
  items: Proptypes.arrayOf(Proptypes.object).isRequired,
  showItems: Proptypes.string.isRequired,
  stop: Proptypes.string.isRequired,
  removeList: Proptypes.func.isRequired,
};

export default Carousel;
