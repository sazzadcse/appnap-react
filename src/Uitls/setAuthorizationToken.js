import axios from 'axios';
import $ from 'jquery';

export default function setAuthorizationToken(token) {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}