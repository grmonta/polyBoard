import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    color,
    bio,
    birthday,

    user: { name, email }
  }
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          {' '}
          <h2 className='text-primary'> About {name.trim().split(' ')[0]} </h2>
          <p>{bio}</p>
          <div className='line'> </div>
        </Fragment>
      )}
      {}

      <h2 className='text-primary'>Fun facts </h2>
      <div className='skills'>
        <div className='p-1'>Favorite Color: {color} </div>
        <div className='p-1'>Birthday: {birthday} </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
