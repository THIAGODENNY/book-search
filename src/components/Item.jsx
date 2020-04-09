import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Item.css';

class Item extends Component {
  constructor({ item, addItemWishlist }) {
    super();
    this.addItemWishlist = addItemWishlist;
    this.item = item;
    this.id = this.item.id;
    this.volumeInfo = this.item.volumeInfo;

    this.imageLinks = this.volumeInfo.imageLinks;
    this.title = this.volumeInfo.title;
    this.infoLink = this.volumeInfo.infoLink;
    this.description = this.volumeInfo.description;

    this.smallThumbnail = (this.imageLinks ? this.imageLinks.smallThumbnail : undefined);
    this.defaultUrl = 'https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png';
  }

  render() {
    return (
      <div key={this.id} className="item">
        <div className="card">
          <a className="item-title" href={this.infoLink}>{this.title}</a>
          <div className="container">
            <div className="container-image">
              <input className="item-image" type="image" src={this.smallThumbnail || this.defaultUrl} alt="Logo" onClick={() => this.addItemWishlist(this.id)} />
            </div>
            <div className="container-description">
              <span className="item-description">{this.description}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
