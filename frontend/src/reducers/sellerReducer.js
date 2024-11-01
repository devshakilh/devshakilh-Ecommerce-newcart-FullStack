// src/reducers/sellerReducer.js

import {
    REQUEST_SELLER_REQUEST,
    REQUEST_SELLER_SUCCESS,
    REQUEST_SELLER_FAIL,
    GET_SELLER_REQUESTS_REQUEST,
    GET_SELLER_REQUESTS_SUCCESS,
    GET_SELLER_REQUESTS_FAIL
} from '../constants/actionTypes';


const initialState = {
    loading: false,
    sellerRequests: [],
    error: null
};


const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_SELLER_REQUEST:
            return { ...state, loading: true };
        case REQUEST_SELLER_SUCCESS:
            return { ...state, loading: false, sellerRequests: action.payload };
        case REQUEST_SELLER_FAIL:
            return { ...state, loading: false, error: action.payload };
        case GET_SELLER_REQUESTS_REQUEST:
            return { ...state, loading: true };
        case GET_SELLER_REQUESTS_SUCCESS:
            return { ...state, loading: false, sellerRequests: action.payload };
        case GET_SELLER_REQUESTS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default sellerReducer;
