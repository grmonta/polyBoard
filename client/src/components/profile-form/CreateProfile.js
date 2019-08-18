import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    color: '',
    bio: '',
    birthday: '',
    extension: ''
  });

  const { title, color, bio, birthday, extension } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
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
          value='Create Profile'
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
