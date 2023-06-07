import PropTypes from 'prop-types';
import {ImageGalleryItemLi, ImageGalleryItemImage} from './ImageGalleryItem.styled'

const ImageGalleryItem = ({webformatURL, tags, toggleModal, largeImageURL}) => {
    return (
        <>
            <ImageGalleryItemLi onClick={() => toggleModal(largeImageURL, tags)}>
                <ImageGalleryItemImage src={webformatURL} alt={tags} />
            </ImageGalleryItemLi>
        </>
    )  
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}

export default ImageGalleryItem;