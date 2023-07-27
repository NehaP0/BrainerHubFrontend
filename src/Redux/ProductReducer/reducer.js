import { FAILURE, REQUEST, GET_PRODUCTS_SUCCESS, ADD_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS } from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return { ...state, isLoading: true };
    case GET_PRODUCTS_SUCCESS:
      // console.log("payload is "+ JSON.stringify(action.payload.data.products));
      return { ...state, isLoading: false, products: JSON.stringify(action.payload.data.products, null, 2), isError: false };
    case ADD_PRODUCT_SUCCESS: return{...state}
    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, isError: false };
    case FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
