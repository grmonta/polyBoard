import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = props => {
  return (
    <div className='dash-card'>
      <Link to={props.to}>
        <div className='card-header lead'>{props.title}</div>
        <hr />
        <div className='card-content hide-sm'>{props.content}</div>
      </Link>
    </div>
  );
};

export default DashboardCard;
