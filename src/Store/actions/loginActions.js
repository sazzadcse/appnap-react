import { SET_STORAGE, USER, GET_STORAGE, REMOVE_STORAGE, AJAX_PUBLIC_REQUEST, SET_LOGIN_COOKIE, DELETE_LOGIN_COOKIE } from '../../Constants/AppConstants';
import history from '../../history';

import { SET_CURRENT_USER } from './actionTypes';

const config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function logout(){
    return dispatch => {
        REMOVE_STORAGE(USER);
        DELETE_LOGIN_COOKIE();
        dispatch(setCurrentUser({}));
        history.push('/login');
    }
}

export function serviceLogout(){
    return dispatch => {
        REMOVE_STORAGE(USER);
        DELETE_LOGIN_COOKIE();
        dispatch(setCurrentUser({}));
    }
}

export function userLoginRequest(userData) {
    return dispatch => {
        const request_result = AJAX_PUBLIC_REQUEST("POST","login",userData);
            request_result.then(results => {
                    if( results.code === 1000 ) {
                        const user_data = results.data;
                        user_data.remember = false;
                        if( results.login === true ) {
                            user_data.token = results.token;
                        }

                        SET_STORAGE(USER,JSON.stringify(user_data));
                        SET_LOGIN_COOKIE(JSON.stringify(user_data));
                        const cur_storage2 = GET_STORAGE(USER);
                        const cur_storage = JSON.parse(cur_storage2);
                        dispatch(setCurrentUser(cur_storage));

                        
                    } else {
                        // console.log(results);
                        history.push('/login');
                    }            
                }
            );
        return request_result;
    }
}