import React, {createContext, useReducer} from "react";
import UserReducer from "../reducers/UserReducer";

export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: ()=> null,
    removeCurrentUser: ()=> null
})

const INITIAL_STATE = {
    currentUser:null
}

export const UserProvider = ({children}) => {
    
  //  const [currentUser, setCurrentUser] = useState(null);
    const [currentUser, dispatch] = useReducer(UserReducer, INITIAL_STATE)

    const setCurrentUser = (user) => {
        dispatch({type:"SET_CURRENT_USER", payload: user})
    } 

    const removeCurrentUser = () => {
        dispatch({type:"REMOVE_CURRENT_USER", payload: null})
    } 

    const value = {currentUser, setCurrentUser, removeCurrentUser};

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}