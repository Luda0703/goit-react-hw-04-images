import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import {ImageGalleryUl} from './ImageGallery.styled'

const ImageGallery = ({ images, toggleModal }) => {

    return (
        <ImageGalleryUl>
             {images.map(({id, webformatURL, tags, largeImageURL }) => (
             <ImageGalleryItem 
             key={id} 
             webformatURL={webformatURL} 
             tags={tags}
             largeImageURL={largeImageURL}
             toggleModal={toggleModal}
             />
             ))}
        </ImageGalleryUl>
    )
}
ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    toggleModal: PropTypes.func.isRequired,
}

export default ImageGallery;