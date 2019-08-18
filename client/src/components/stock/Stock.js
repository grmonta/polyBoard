import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import StockItem from '../stocks/StockItem';

import NoteForm from '../stock/NoteForm';
import { getStock } from '../../actions/stock';

const Stock = ({ getStock, stock: { stock, loading }, match }) => {
  useEffect(() => {
    getStock(match.params.id);
  }, [getStock]);
  return loading || stock === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/stocks' className='btn btn-primary my-1'>
        {' '}
        Go Back To Items
      </Link>
      <table className='table'>
        <thead>
          <tr>
            <th>Item Number</th>
            <th className='hide-sm'>Requested By</th>
            <th className='hide-sm'>Created On</th>
            <th className='hide-sm'>Notes</th>
            <th>In Stock Date</th>
            <th className='hide-sm' />
            <th className='hide-sm' />
          </tr>
        </thead>
        <StockItem stock={stock} />

        <NoteForm stockId={stock._id} />
      </table>
      {/* <div className='comments'>
        {stock.notes.map(note => (
          <NoteItem key={note._id} note={note} stockId={stock._id} />
        ))}
      </div> */}
    </Fragment>
  );
};

Stock.propTypes = {
  getStock: PropTypes.func.isRequired,
  stock: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stock: state.stock,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getStock }
)(Stock);
