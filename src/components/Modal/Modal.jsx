import PropTypes from 'prop-types';
import { Overlay, ModalDiv } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({largeImage, tags, onClose}) {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.removeEventListener('keydown', handleKeyDown)
    })

    const handleKeyDown = e => {
        if(e.code === 'Escape') {
            onClose();
        }
    }

    const handleBackdropClose = e => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    }

    return createPortal(
        <Overlay onClick={handleBackdropClose}>
            <ModalDiv>
                <img src={largeImage} alt={tags}/>
            </ModalDiv>
        </Overlay>,
        modalRoot
    )
}

Modal.propTypes = {
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

