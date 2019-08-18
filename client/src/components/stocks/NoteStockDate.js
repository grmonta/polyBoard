import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const NoteStockDate = props => {
  return (
    <Fragment>
      <p>{props.inStockDate}</p>
    </Fragment>
  );
};

NoteStockDate.propTypes = {};

export default NoteStockDate;
