import React from 'react';
import Modal from 'react-modal';

export const ModalDelete = ({ rModalOpen, deleteBlog, setRModalOpen }) => (
    <Modal
        isOpen={rModalOpen}
        contentLabel="Delete Blog"
        closeTimeoutMS={100}
        onRequestClose={() => setRModalOpen(false)}
      >
        <h5>If you delete this blog there is no way to return it.</h5>
        <button data-testid='delete_button' onClick={deleteBlog}>Delete Blog</button>
        <button data-testid='close_button' onClick={() => setRModalOpen(false)}>X</button>
    </Modal>
);

export default ModalDelete;