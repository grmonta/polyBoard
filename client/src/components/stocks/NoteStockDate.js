import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const NoteStockDate = props => {
  return (
    <Fragment>
      <Moment format='MMM Do YYYY'>{props.inStockDate}</Moment> <br />
    </Fragment>
  );
};

NoteStockDate.propTypes = {};

export default NoteStockDate;
