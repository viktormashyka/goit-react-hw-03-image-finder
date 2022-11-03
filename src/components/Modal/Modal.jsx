import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('componentDidMount...');
    window.addEventListener('keydown', this.handleEscClose);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount...');
    window.removeEventListener('keydown', this.handleEscClose);
  }

  handleEscClose = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClickClose = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  redner() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClickClose}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
