import React from "react";
import Modal from "react-modal";
import BlogPage from "./BlogPage";

export const ModalPreview = ({ pModalOpen, setPModalOpen, bid }) => {
    return (
        <Modal
            isOpen={pModalOpen}
            contentLabel="Preview Blog"
            closeTimeoutMS={50}
            onRequestClose={() => setPModalOpen(false)}
        >
            <button data-testid='close_button' onClick={() => setPModalOpen(false)}>X</button>
            <BlogPage match={{params: {bid: `${bid}`}}} isPreview={true} />
        </Modal>
    )
};

export default ModalPreview;