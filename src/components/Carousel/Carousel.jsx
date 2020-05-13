import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import './Carousel.scss';
import Modal from 'react-modal';

const Carousel = ({
  items, showItems, removeList,
}) => {
  const [urls, setUrls] = useState(items);
  const [imgNumber, setImgNumber] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [deleteListOpened, setDeleteListOpened] = useState(false);

  const previousImage = () => {
    const newUrls = urls;
    newUrls.unshift(newUrls.pop());
    return setUrls(() => [...newUrls]);
  };

  const nextImage = () => {
    const newUrls = urls;
    newUrls.push(newUrls.shift());
    return setUrls(() => [...urls]);
  };

  const deleteListOpen = () => setDeleteListOpened(true);
  const deleteListClose = () => setDeleteListOpened(false);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(() => window.innerWidth));
  }, []);

  useEffect(() => {
    setUrls(() => [...items]);
  }, [items]);

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

  let carouselSize;
  if (width >= 1000) {
    carouselSize = 3;
  }
  if (width < 1000) {
    carouselSize = 2;
  }
  if (width < 800) {
    carouselSize = 1;
  }

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
        <h1 className="carousel__header__title">{urls[0].listName}</h1>
      </div>
      <div className="carousel">
        <div className="carousel__items">
          <input type="button" className="carousel__back" onClick={previousImage} value="<" />
          {urls
            .slice(0, carouselSize)
            .map(
              (url) => (
                <input
                  type="image"
                  className="carousel__image"
                  src={url.volumeInfo.imageLinks.smallThumbnail}
                  onClick={() => showItems(url.id)}
                  alt="logo"
                />
              ),
            )}
          <input type="button" className={`carousel__next ${(urls.length >= 3 && carouselSize > 2) && 'carousel__next--full'}`} onClick={nextImage} value=">" />
        </div>
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
  removeList: Proptypes.func.isRequired,
};

export default Carousel;
