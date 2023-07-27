import axios from "axios";
import { FAILURE, REQUEST, GET_PRODUCTS_SUCCESS, ADD_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS } from "./actionTypes";
import { store } from "../store"; 


// Create a new Axios instance
const axiosInstance = axios.create();

// set the token from the Redux store before every request
axiosInstance.interceptors.request.use((config) => {
  // Import the store here to access the token
  const token = store.getState().authReducer.token; // Get the token from the Redux store

  console.log(token);

  if (token) {
    config.headers["Authorization"] = token;
  } else {
    console.log("No token provided");
  }
  return config;
});


export const getProductsAction = ({search, page, limit})=>(dispatch) => {
  console.log(search, page, limit);
  dispatch({ type: REQUEST });

  //query parameters based on the provided values
  const queryParams = {
    search: search || "", // Empty string if searchTerm is not provided
    page: page || 1, // Default to page 1 if currentPage is not provided
    limit: limit || 8, // Default to 8 products per page if productsPerPage is not provided
  };

  // query string library to convert queryParams object to a query string
  const queryString = Object.keys(queryParams)
  .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
  .join("&");

  return axiosInstance.get(`https://brainer-xecs.onrender.com/products/?${queryString}`)
    .then((res) => {dispatch({ type: GET_PRODUCTS_SUCCESS, payload: res.data })
      console.log(res.data);
    })
    .catch((err) => {dispatch({ type: FAILURE })
      console.log(err);});
};

export const addProductAction = (productData) => (dispatch) => {
  dispatch({ type: REQUEST });
  return axiosInstance
    .post("https://brainer-xecs.onrender.com/products", productData)
    .then(() => dispatch({ type: ADD_PRODUCT_SUCCESS }))
    .catch((err) => {dispatch({ type: FAILURE })
    console.log(err)
  });
};

// export const updateProductAction = (productId, productData) => (dispatch) => {
//   dispatch({ type: REQUEST });
//   return  axiosInstance
//     .put(`https://brainer-xecs.onrender.com/products/${productId}`, productData)
//     .then(() => dispatch({ type: UPDATE_PRODUCT_SUCCESS }))
//     .catch(() => dispatch({ type: FAILURE }));
// };
