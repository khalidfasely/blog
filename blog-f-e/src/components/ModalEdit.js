import React from 'react';
import Modal from 'react-modal';
import NewBlog from './NewBlog';

export const ModalEdit = ({ eModalOpen, blog, setEModalOpen }) => (
    <Modal
        isOpen={eModalOpen}
        contentLabel="Edit Blog"
        closeTimeoutMS={100}
        onRequestClose={() => setEModalOpen(false)}
    >
        <NewBlog isEdit={true} blog={blog} edit={() => setEModalOpen(false)} />
        <button data-testid='close_button' onClick={() => setEModalOpen(false)}>X</button>
    </Modal>
);

export default ModalEdit;