import axios from 'axios'

export const AuthUser = (user) => {
    console.log("at action"+user);
    return async function(dispatch, getState) {
        await axios.post("http://localhost:8000/user/authenticate",user,{
            responseType:"json"
        })
        .then(data => {
            localStorage.setItem("jwt",data.data.jwt);
            localStorage.setItem("user",JSON.stringify(data.data.user));
            localStorage.setItem("balance",JSON.stringify(data.data.user.balance));
            console.log( JSON.parse(localStorage.getItem("user")));   
            return dispatch({
                type: "ADDJWT",
                data: data.data.jwt
            });  
        });
    };
}


export const RegisterUser = (user) => {
    console.log("at action"+user);
    return async function(dispatch, getState) {
        await axios.post("http://localhost:8000/user/register",user)
        .then(data => {
            console.log(data);     
        });
    };
}


export const GetUser = (token) => {
    console.log("at action"+token);
    return async function(dispatch, getState) {
        await axios.get("http://localhost:8000/user/getuser",{
            headers: { Authorization: `Bearer ${token}`}   
        })
        .then(data => {
            console.log(data);
            return dispatch({
                type: "ADDUSER",
                data: data.data
            });
        });
    };
}



