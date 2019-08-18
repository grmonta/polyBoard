import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    title: '',
    color: '',
    bio: '',
    birthday: '',
    extension: ''
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      title: loading || !profile.title ? '' : profile.title,
      color: loading || !profile.color ? '' : profile.color,
      bio: loading || !profile.bio ? '' : profile.bio,
      birthday: loading || !profile.birthday ? '' : profile.birthday,
      extension: loading || !profile.extension ? '' : profile.extension
    });
  }, [loading, getCurrentProfile]);

  const { title, color, bio, birthday, extension } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Let's get some information that will be
        used in the employee directory.
      </p>
      <small>* = required field </small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='*Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Favorite Color of Our Clays'
            name='color'
            value={color}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Tell us a little bit about yourself and what duties you are
            responsible for here at Polyform.
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Birthday'
            name='birthday'
            vlaue={birthday}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder=' Extension'
            name='extension'
            vlaue={extension}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            If you are remote please provide your contact number
          </small>
        </div>
        <input
          type='submit'
          className=' btn btn-primary my-1'
          value='Edit Profile'
        />
        <br />
        <Link to='/dashboard'>
          {' '}
          <i className='fas fa-backward' /> Back To Dashboard
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,

  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
