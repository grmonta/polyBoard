import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addStock } from '../../actions/stock';

const StockForm = ({ addStock }) => {
  const [formData, setFormData] = useState({
    itemNumber: ''
  });

  const { itemNumber } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Add an item to find out when it will be in stock. </h3>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          addStock(formData);
        }}
        className='form'
      >
        <div className='form-group'>
          <input
            type='text'
            name='itemNumber'
            placeholder='Item number'
            value={itemNumber}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Submit New Item'
            className=' btn btn-primary'
          />
          <Link to='/dashboard' className='btn btn-primary my-1'>
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

StockForm.propTypes = {
  addStock: PropTypes.func.isRequired
};

export default connect(
  null,
  { addStock }
)(withRouter(StockForm));
