import * as api from '../api/index';
import * as actionTypes from '../constants/actionTypes'

export const authSucces = (data) =>{
    return {
        type: actionTypes.AUTH,
        payload: data
    }
}

export const authFail = (data) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        payload: data
    }
}

export const auth = (data, isSignup, history) =>{
    return dispatch=>{
        if(!isSignup){
            api.signup(data)
            .then(res =>{
                dispatch(authSucces(res.data))
                history.push('/')
            }).
            catch(e => {
                dispatch(authFail(e.response))
            })
        }else{
            api.signin(data)
            .then(res =>{
                dispatch(authSucces(res.data)) 
                history.push('/')
            })
            .catch(e => {
                dispatch(authFail(e.response.data))
            })
        }
        
    }
}

export const logout = () =>{
    return {
        type: actionTypes.LOGOUT
    }
} 
export const onLogout = () =>{
    return dispatch =>{
        api.logout()
            .then(res=>{
                dispatch(logout())
            })
            .catch(e => console.log(e))
    }
}