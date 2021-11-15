import React from 'react';
import Modal from 'react-modal';
import NewBlog from './NewBlog';

const ModalEdit = ({ eModalOpen, blog, setEModalOpen }) => (
    <Modal
        isOpen={eModalOpen}
        contentLabel="Edit Blog"
        closeTimeoutMS={100}
    >
        <NewBlog isEdit={true} blog={blog} edit={() => setEModalOpen(false)} />
        <button onClick={() => setEModalOpen(false)}>X</button>
    </Modal>
);

export default ModalEdit;