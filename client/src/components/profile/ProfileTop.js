import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    title,
    user: { name, email },
    extension
  }
}) => {
  return (
    <div className=' profile-top bg-primary p-2'>
      <h1 className='large'>{name}</h1>
      <p className='lead'>{title}</p>
      <p className='lead'>
        <i className='fas fa-envelope-square' /> {email}
      </p>
      <p className='lead'>
        <i className='fas fa-phone' /> Extension:
        {extension}
      </p>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
