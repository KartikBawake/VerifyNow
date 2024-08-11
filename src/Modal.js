// src/Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal_header">
            <h2>{title}</h2>
        </div>
        <div className="modal_content">
            <p>{content}</p>
        </div>
      </div>
    </div>
  );
};
export default Modal;