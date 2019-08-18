import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../components/layouts/Spinner';

import DashboardCard from './DashboardCard';
import DashboardActions from './DashboardActions';

import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {' '}
        <i className='fas fa-user'> </i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fa fa-user-minus'> </i> Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {' '}
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-secondary my-1 '>
            {' '}
            Create Profile{' '}
          </Link>
        </Fragment>
      )}
      <section className='dash-cards'>
        <DashboardCard
          to='/stocks'
          title='Stock'
          content='Add out of stock items and edit in stock dates'
        />
        <DashboardCard
          to='/projects'
          title='Projects'
          content='View curent projects and add new projects'
        />
        <DashboardCard
          to='/profiles'
          title='Directory'
          content='View current employees'
        />
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
