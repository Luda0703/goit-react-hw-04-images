import PropTypes from 'prop-types';
import { Overlay, ModalDiv } from './Modal.styled';
import { createPortal } from 'react-dom';
import React, { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        if(e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClose = e => {
        if(e.target === e.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        const {largeImage, tags} = this.props
        return createPortal(
            <Overlay onClick={this.handleBackdropClose}>
                <ModalDiv>
                    <img src={largeImage} alt={tags}/>
                </ModalDiv>
            </Overlay>,
            modalRoot
        )
    }
}

Modal.propTypes = {
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal;