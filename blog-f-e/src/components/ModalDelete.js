import React from 'react';
import Modal from 'react-modal';

const ModalDelete = ({ rModalOpen, deleteBlog, setRModalOpen }) => (
    <Modal
        isOpen={rModalOpen}
        contentLabel="Delete Blog"
        closeTimeoutMS={100}
      >
        <h5>If you delete this blog there is no way to return it.</h5>
        <button onClick={deleteBlog}>Delete Blog</button>
        <button onClick={() => setRModalOpen(false)}>X</button>
    </Modal>
);

export default ModalDelete;