import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, email },
    title
    // color,
    // bio,
    // birthday,
    // extension
  }
}) => {
  return (
    <div className='profile bg-light my-1 py-1'>
      <div>
        <h2 className='profile-name'>{name}</h2>
        <hr />
        <p> {title} </p>
        <p> {email} </p>

        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Full Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
