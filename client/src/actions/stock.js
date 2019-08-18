import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_STOCKS,
  STOCK_ERROR,
  DELETE_STOCK,
  ADD_STOCK,
  GET_STOCK,
  ADD_NOTE,
  REMOVE_NOTE
} from './types';

//get stocks
export const getStocks = () => async dispatch => {
  try {
    const res = await axios.get('/api/stock');
    dispatch({
      type: GET_STOCKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//get a Stock item

export const getStock = id => async dispatch => {
  try {
    const res = await axios.get(`/api/stock/${id}`);
    dispatch({
      type: GET_STOCK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//DELETE STOCK

export const deleteStock = id => async dispatch => {
  try {
    await axios.delete(`/api/stock/${id}`);
    dispatch({
      type: DELETE_STOCK,
      payload: id
    });
    dispatch(setAlert('Item Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//ADD STOCK

export const addStock = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/stock`, formData, config);
    dispatch({
      type: ADD_STOCK,
      payload: res.data
    });

    dispatch(setAlert('Item Created', 'success'));
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//ADD NOTE TO STOCK

export const addNote = (stockId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/stock/notes/${stockId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_NOTE,
      payload: res.data
    });

    dispatch(setAlert('Item updated', 'success'));
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//DELETE NOTE

export const deleteNote = ({ stockId, noteId }) => async dispatch => {
  try {
    await axios.delete(`/api/stock/notes/${stockId}/${noteId}`);
    dispatch({
      type: REMOVE_NOTE,
      payload: noteId
    });

    dispatch(setAlert('Note removed', 'success'));
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
