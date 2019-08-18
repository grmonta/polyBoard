import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const NoteItem = props => {
  return (
    <Fragment>
      <p>{props.issue}</p>
    </Fragment>
  );
};

NoteItem.propTypes = {};

export default NoteItem;
