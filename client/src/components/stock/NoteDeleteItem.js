import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NoteItem from '../stocks/NoteItem';
import NoteStockDate from '../stocks/NoteStockDate';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteNote } from '../../actions/stock';

const NoteDeleteItem = ({
  stockId,
  notes: { _id, user, name, issue, inStockDate },
  auth
}) => {
  return (
    <button
      type='button'
      className='btn'
      onClick={e => deleteNote(stockId, _id)}
    >
      <i className='fas fa-minus-circle' />
    </button>
  );
};

NoteDeleteItem.propTypes = {
  stockId: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  deleteNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteNote }
)(NoteDeleteItem);
