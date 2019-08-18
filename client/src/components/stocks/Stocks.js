import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import StockItem from './StockItem';
import StockForm from './StockForm';
import { getStocks } from '../../actions/stock';

const Stocks = ({ getStocks, stock: { stocks, loading } }) => {
  useEffect(() => {
    getStocks();
  }, [getStocks]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Items Out of Stocks</h1>
      <p className='lead'>
        <i className='fas fa-user'> </i>
        Welcome to the stock page. You can edit and delete out of stock request.
      </p>

      <StockForm />
      <div className='stocks'>
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

          {stocks.map(stock => (
            <StockItem key={stock._id} stock={stock} />
          ))}
        </table>
      </div>
    </Fragment>
  );
};

Stocks.propTypes = {
  getStocks: PropTypes.func.isRequired,
  stock: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  stock: state.stock
});
export default connect(
  mapStateToProps,
  { getStocks }
)(Stocks);
