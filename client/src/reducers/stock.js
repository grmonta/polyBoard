import {
  GET_STOCKS,
  STOCK_ERROR,
  DELETE_STOCK,
  ADD_STOCK,
  GET_STOCK,
  ADD_NOTE,
  REMOVE_NOTE
} from '../actions/types';

const initialState = {
  stocks: [],
  stock: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_STOCKS:
      return {
        ...state,
        stocks: payload,
        loading: false
      };
    case GET_STOCK:
      return {
        ...state,
        stock: payload,
        loading: false
      };
    case ADD_STOCK:
      return {
        ...state,
        stocks: [payload, ...state.stocks],
        loading: false
      };
    case DELETE_STOCK:
      return {
        ...state,
        stocks: state.stocks.filter(stock => stock._id !== payload),
        loading: false
      };
    case STOCK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_NOTE:
      return {
        ...state,
        stock: { ...state.stock, notes: payload },
        loading: false
      };
    case REMOVE_NOTE:
      return {
        ...state,
        stock: {
          ...state.stock,
          notes: state.stock.notes.filter(note => note._id !== payload)
        },
        loading: false
      };
    default:
      return state;
  }
}
