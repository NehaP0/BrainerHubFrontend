import { FAILURE, REQUEST, LOGIN_SUCCESS, SIGNUP_SUCCESS } from "./actionTypes";

const initialState = {
    isLoading: false,
    isError: false,
    isAuth: false,
    token: "",
};
console.log("initialstate"+initialState)

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST:
            return { ...state, isLoading: true };
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, isAuth: true, token: action.payload, isError: false };
        case SIGNUP_SUCCESS:
            return { ...state, isLoading: false, isError: false, isAuth: false}
        case FAILURE:
            return { ...state, isLoading: false, isError: true };        
        default:
            return state;
    }
};
console.log(initialState)
