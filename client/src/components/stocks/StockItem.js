import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import NoteItem from './NoteItem';
import NoteStockDate from './NoteStockDate';

import { deleteStock, deleteNote } from '../../actions/stock';

const StockItem = ({
  deleteStock,

  auth,
  stock: { _id, itemNumber, createdDate, name, user, notes },
  deleteNote
}) => {
  return (
    <Fragment>
      <tbody>
        <tr>
          <td>{itemNumber}</td>
          <td className='hide-sm'>
            <Link to={`/profile/${user}`}> {name}</Link>
          </td>
          <td className='hide-sm'>
            <Moment format='MMM Do'>{createdDate}</Moment>
          </td>

          <td className='hide-sm'>
            {notes.map(note => (
              <NoteItem key={note._id} issue={note.issue} />
            ))}
          </td>
          <td>
            {notes.map(note => (
              <NoteStockDate key={note._id} inStockDate={note.inStockDate} />
            ))}
          </td>
          <td>
            <Link to={`/stocks/${_id}`} className='btn btn-primary'>
              Update
            </Link>
          </td>
          <td className='hide-sm'>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deleteStock(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times' />
              </button>
            )}
          </td>
        </tr>
      </tbody>
    </Fragment>
  );
};

StockItem.propTypes = {
  stock: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteStock: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deleteStock, deleteNote }
)(StockItem);
