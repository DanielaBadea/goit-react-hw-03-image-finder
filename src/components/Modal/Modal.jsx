import React from "react";
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
  
    handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        this.props.closeModal();
      }
    };
  
    handleOverlayClick = (e) => {
      if (e.currentTarget === e.target) {
        this.props.closeModal();
      }
    };
  
    render() {
      const { image } = this.props;
  
      return (
        <div className={styles.overlay} onClick={this.handleOverlayClick}>
          <div className={styles.modal}>
            <img src={image} alt={image.tags} />
          </div>
        </div>
      );
    }
  }
  
  Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
  };
  
  export default Modal;
