import { AUTH, GET_USER, LOGOUT, AUTH_FAIL } from '../constants/actionTypes';
                
const authReducer = ( state = {authData: null, isSignUp: false, errMessage: null}, action) => {
    switch( action.type ){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify(action.payload))
            return { ...state, isSignUp: true};
        case AUTH_FAIL:
            return { ...state, errMessage: action.payload}
        case GET_USER:
            return { ... state, authData: action.payload }
        case LOGOUT: 
            localStorage.clear();
            return { ...state, authData: null, isSignUp: true }
        default:
            return state;
    }
}

export default authReducer;
