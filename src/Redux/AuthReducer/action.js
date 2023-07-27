import axios from "axios";
import { FAILURE,REQUEST,LOGIN_SUCCESS, SIGNUP_SUCCESS } from "./actionTypes";


// Create a new Axios instance with default headers
const axiosInstance = axios.create({
    baseURL: "https://brainer-xecs.onrender.com",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const loginAction = (credentialsobj) => (dispatch) => {
    console.log("Login request payload:", credentialsobj); // Add this line to check the payload being sent

    dispatch({ type: REQUEST });

    // Create a new CancelToken source
  const source = axios.CancelToken.source();
  // Set the cancelToken option in the request config
  const config = {
    cancelToken: source.token,
  };

    return axiosInstance
        .post("/auth/login", credentialsobj, config)
        .then((res) => {  
            console.log("Login response:", res.data); // Add this line to check the response from the backend

            const token = res.data.data.token;  
            console.log("token is" + token);
            localStorage.setItem("token",token)  
            dispatch({ type: LOGIN_SUCCESS, payload: token })
            window.alert("Login successful!");
          })
        .catch((err) =>{ 
            console.log(err);
            if (axios.isCancel(err)) {
                console.log("Request canceled:", err.message);
              } 
              else {
            dispatch({ type: FAILURE })
            window.alert("Invalid credentials. Please try again.");
              }
            });
};

export const SignUpAction = (credentialsobj) => (dispatch) => {
    dispatch({ type: REQUEST });
    return axios
        .post("https://brainer-xecs.onrender.com/auth/register", credentialsobj)
        .then((res) => dispatch({ type: SIGNUP_SUCCESS }))
        .catch((err) => {dispatch({ type: FAILURE })
        console.log(err);});
};

export { axiosInstance };


