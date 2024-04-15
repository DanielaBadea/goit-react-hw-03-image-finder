import React from "react";
import styles from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';

class ImageGalleryItem extends React.Component {

    handleClickImg = () => {
        this.props.openModal(this.props.image);
      };
    
    render(){
        const { image } = this.props;
        return(
            <>
            <img src={image.webformatURL} alt={image.tags} loading='lazy' className={styles.itemsImg} onClick={this.handleClickImg}/>
            </>
        )
        
    }
}   
ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
    }).isRequired
};
export default ImageGalleryItem;
