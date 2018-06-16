// --------------- REDUCER --------------- //

import axios from 'axios';
import { BASEURL } from '../secrets';

const initialState = {
    user: [],
    couponNavSelected: 1,
    couponRedeemSelection: '',
    commodities: [],
    updateUsersCommStatus: ''
}

// --ACTION CONSTRAINTS--
const GET_USER = 'GET_USER';
const REGISTER_USER = 'REGISTER_USER';
const CHANGE_COUPON_NAV_SELECTION = 'CHANGE_COUPON_NAV_SELECTION';
const CHANGE_COUPON_REDEEM_SELECTION = 'CHANGE_COUPON_REDEEM_SELECTION';
const SAVE_COMMODITIES = 'SAVE_COMMODITIES';
const SET_PREFERED_COMMODITIES_ON_REDUX = 'SET_PREFERED_COMMODITIES_ON_REDUX';
const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const LOGOUT = 'LOGOUT';

// --ACTION CREATORS--
export function getUserInfo(userId) {
    const userData = axios.get(`${BASEURL}/api/user/${userId}`)
        .then(res => res.data)
    return {
        type: GET_USER,
        payload: userData
    }
}
export function changeCpnHeaderSelected(val) {
    return {
        type: CHANGE_COUPON_NAV_SELECTION,
        payload: val
    }
}
export function changeCpnRedeemSelected(val) {
    return {
        type: CHANGE_COUPON_REDEEM_SELECTION,
        payload: val
    }
}

export function setUserInfo(credentials) {
    const userInfo = axios.post(`${BASEURL}/login`, credentials)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
        })
    return {
        type: SET_USER,
        payload: userInfo
    }
}

export function registerUserInfo(credentials) {
    const userInfo = axios.post(`${BASEURL}/api/user/register`, credentials) // username, password, name, birthday, phone, referralCode, licenseNumber 
        .then(response =>  response.data)
        .catch(error => {
            console.log(error)
        })
    return {
        type: REGISTER_USER,
        payload: userInfo
    }
}

export function saveUsersCommodities(body) {
    const commodityData = axios.post(`${BASEURL}/api/user/commodity`, body)
        .then(res => res.data)
    return {
        type: SAVE_COMMODITIES,
        payload: commodityData
    }
}

export function setCommoditiesOnRedux(commodityInfo) {
    return {
        type: SET_PREFERED_COMMODITIES_ON_REDUX,
        payload: commodityInfo
    }
}

export function updateUser(body) {
    const updatedUserData = axios.put(`${BASEURL}/api/user/edit/profile`, body)
        .then(res => "Success")
        .catch(err => console.log(err))
    return {
        type: UPDATE_USER,
        payload: updatedUserData
    }
}

export function updateAddress(body) {
    const updated = axios.put(`${BASEURL}/api/user/edit/address`, body)
        .then(res => "Success")
        .catch(err => console.log(err))
    return {
        type: UPDATE_ADDRESS,
        payload: updated
    }
}

export function logOut() {
    axios.get(`${BASEURL}/logout`)
        .then((res) => {
            console.log(res.data);
        }).catch(err => console.log(err))
    return {
        type: LOGOUT,
        payload: []
    }
}

// --REDUCER--
export default function reducer(state = initialState, action) {
    console.log('action fired!! ', action)

    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case REGISTER_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case CHANGE_COUPON_NAV_SELECTION:
            return Object.assign({}, state, { couponNavSelected: action.payload });
        case CHANGE_COUPON_REDEEM_SELECTION:
            return Object.assign({}, state, { couponRedeemSelection: action.payload });
        case SET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        case SAVE_COMMODITIES + '_PENDING':
            return Object.assign({}, state, { updateUsersCommStatus: action.type });
        case SAVE_COMMODITIES + '_REJECTED':
            return Object.assign({}, state, { updateUsersCommStatus: action.type });
        case SAVE_COMMODITIES + '_FULFILLED':
            return Object.assign({}, state, { updateUsersCommStatus: action.type, user: action.payload });
        case SET_PREFERED_COMMODITIES_ON_REDUX:
            return Object.assign({}, state, { commodities: action.payload });
        case UPDATE_USER + '_FULFILLED':
            return state;
        case UPDATE_ADDRESS + '_FULFILLED':
            return state;
        case LOGOUT + '_FULFILLED':
            return Object.assign({}, state, {
                user: action.payload, couponNavSelected: 1, couponRedeemSelection: ''
            })
        default:
            return state;
    }
}