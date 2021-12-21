import React, { useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { startEditProfile } from '../actions/userPage';

export const ModalEditProfile = ({ ePrModalOpen, setEdPrModalOpen, bio, resetInfoProfile, uname, startEditProfile }) => {
  const [bioVal, setBioVal] = useState(bio);

  const onBioChange = (e) => {
    const bio = e.target.value;
    setBioVal(bio);
  }

  const onFormEditProfileSub = (e) => {
    e.preventDefault();

    startEditProfile(uname, {bio: bioVal});
    resetInfoProfile({bio: bioVal});
    setEdPrModalOpen(false);
  }

  return (
    <Modal
        isOpen={ePrModalOpen}
        contentLabel="Edit Profile"
        closeTimeoutMS={100}
        onRequestClose={() => setEdPrModalOpen(false)}
      >
      <button
        data-testid='close_button'
        onClick={() => setEdPrModalOpen(false)}
      >
        X
      </button>
      <h5>Edit profile</h5>
      <form
        data-testid='form'
        onSubmit={onFormEditProfileSub}
      >
        <input
          data-testid='bio_input'
          type='text'
          placeholder='Bio'
          value={bioVal}
          onChange={onBioChange}
        />
        <button
          data-testid='save_button'
        >
          Save New Infos
        </button>
      </form>
    </Modal>
)};

const mapStateToProps = (state) => ({
  uname: state.auth.uname,
});

const mapDispatchToProps = (dispatch) => ({
  startEditProfile: (uname, updates) => dispatch(startEditProfile(uname, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProfile);