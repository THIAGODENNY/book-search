import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({
  isOpen,
  children,
  className,
  onRequestClose,
}) => {
  const [outside, setOutside] = useState(false);

  const handleSetOutside = () => setOutside(true);
  const handleResetOutside = () => setOutside(false);

  const handleOnclick = (event) => {
    if ((outside && !event.keyCode) || event.keyCode === 27) {
      onRequestClose();
    }
  };

  useEffect(() => isOpen
    && document.getElementsByClassName('modal')[0]
      .focus(),
  [isOpen]);

  if (isOpen) {
    return ReactDOM.createPortal(
      <div
        className="modal"
        onClick={handleOnclick}
        onKeyDown={(event) => handleOnclick(event)}
        role="button"
        tabIndex="0"
      >
        <div
          onMouseEnter={handleResetOutside}
          onMouseLeave={handleSetOutside}
          className={className}
        >
          {children}
        </div>
      </div>,
      document.getElementById('root'),
    );
  }
  return null;
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onRequestClose: PropTypes.func,
};

Modal.defaultProps = {
  className: undefined,
  onRequestClose: undefined,
};

export default Modal;
