// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Link, withRouter } from 'react-router-dom';
// import { getStock, addStock } from '../../actions/stock';

// const EditStock = ({
//   getStock,
//   stock: { stock, loading },
//   addStock,
//   history
// }) => {
//   const [formData, setFormData] = useState({
//     itemNumber: '',
//     issue: '',
//     inStockDate: ''
//   });

//   useEffect(() => {
//     getStock();
//     setFormData({
//       itemNumber: loading || !stock.itemNumber ? '' : stock.itemNumber,

//       issue: loading || !stock.notes.issue ? '' : stock.notes.issue,
//       inStockDate:
//         loading || !stock.notes.inStockDate ? '' : stock.notes.inStockDate
//     });
//   }, [loading, getStock]);

//   const { itemNumber, issue, inStockDate } = formData;

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   return (
//     <div className='post-form'>
//       <div className='bg-primary p'>
//         <h3>Add an item to find out when it will be in stock. </h3>
//       </div>

//       <form
//         onSubmit={e => {
//           e.preventDefault();
//           addStock(formData, history, true);
//         }}
//         className='form'
//       >
//         {/* <div className='form-group'>
//           <input
//             type='text'
//             name='itemNumber'
//             placeholder='Item number'
//             value={itemNumber}
//             onChange={e => onChange(e)}
//             required
//           />
//         </div> */}
//         <div className='form-group'>
//           <input
//             type='text'
//             name='issue'
//             placeholder='quality/transit delay'
//             value={issue}
//             onChange={e => onChange(e)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <input
//             type='text'
//             name='inStockDate'
//             placeholder='YYYY/DD/MM'
//             value={inStockDate}
//             onChange={e => onChange(e)}
//             required
//           />
//         </div>

//         <div className='form-group'>
//           <input
//             type='submit'
//             value='Submit New Item'
//             className=' btn btn-primary'
//           />
//           <Link to='/stocks' className='btn btn-primary my-1'>
//             Go Back to Item
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// EditStock.propTypes = {
//   addStock: PropTypes.func.isRequired,
//   getStock: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   stock: state.stock
// });

// export default connect(
//   mapStateToProps,
//   { addStock, getStock }
// )(withRouter(EditStock));
