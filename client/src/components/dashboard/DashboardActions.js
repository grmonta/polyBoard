import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons my-1'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user circle text-primary'> </i> Edit Profile
      </Link>
    </div>
  );
};

export default DashboardActions;
