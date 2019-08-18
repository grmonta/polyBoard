import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNote } from '../../actions/stock';

const NoteForm = ({ stockId, addNote }) => {
  const [formData, setFormData] = useState({
    issue: '',
    inStockDate: ''
  });

  const { issue, inStockDate } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Update the in stock date and leave a note if necessary. </h3>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            addNote(stockId, formData);
          }}
          className='form'
        >
          <div className='form-group'>
            <textarea
              type='text'
              name='issue'
              placeholder='Issue'
              value={issue}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='date'
              name='inStockDate'
              value={inStockDate}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              type='submit'
              value='Update Item'
              className=' btn btn-primary'
            />
            <Link to='/stocks' className='btn btn-primary my-1'>
              Go Back To Items
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

NoteForm.propTypes = {
  addNote: PropTypes.func.isRequired
};

export default connect(
  null,
  { addNote }
)(NoteForm);
