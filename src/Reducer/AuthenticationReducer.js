const initializeState = {
    jwt: "",
    user:{}
}

const JWTReducer = (state = initializeState, action) => {
    console.log(action.type);

    switch (action.type) 
    {
        
        case "ADDJWT":
            return {jwt: action.data};
        
        case "ADDUSER":
            console.log(action.data)
            return{user: action.data};
            
        default:
            console.log(state);
            return state;
    }
}

export default JWTReducer;