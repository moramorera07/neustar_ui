import axios from 'axios';

const login = async (params) => {
    let result = await axios.post(`http://dev.neustar.com/api/auth/login`, params, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    });
    return result;
}; 

const addDomains = async (params) => {
    let user_credentials = JSON.parse(sessionStorage.getItem("user_credentials"));
    console.log(user_credentials)
    let result = await axios.post(`http://dev.neustar.com/api/domain/add`, params, {
        headers: {
            'Authorization': 'Bearer ' + user_credentials.token,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    });
    return result;
}

export default {
    login,
    addDomains
};
  