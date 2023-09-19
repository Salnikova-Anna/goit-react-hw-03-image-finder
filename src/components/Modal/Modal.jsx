import { Component } from 'react';
import { ModalStyled, Overlay } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscPress);
  }

  handleEscPress = evt => {
    if (evt.code === 'Escape') {
      this.props.hideModal();
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.hideModal();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </ModalStyled>
      </Overlay>
    );
  }
}

export default Modal;
