import React, { Fragment } from 'react';

const NoteItem = props => {
  return (
    <Fragment>
      <p>{props.issue}</p>
    </Fragment>
  );
};

export default NoteItem;
