import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/config";
import { LoginContext } from "./loginContext";
import { loginReducer } from "./LoginReducer";

const initialState = {
    isLoggedIn: true,
    user: null,
    imageUser: null,
    email:null
};

export const LoginProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loginReducer, initialState);

    const logUser = (user) => {
        dispatch({
            type: "LOGIN",
            user: user.uid,
        });
        if(user.photoURL){
            dispatch({
                type: "addImage",
                imageUser: user.photoURL
            })
        }
        if(user.email){
            dispatch({
                type: "addEmail",
                email: user.email
            })
        }
    };

    const logOutUser = () => {
        dispatch({
            type: "LOGOUT",
        });
    };

    const checkuserisloggedin =  () => {
        onAuthStateChanged(auth , (user) => {
            if (user) {
                logUser(user);
            } else {
                logOutUser();
            }
        });
    };


    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
            if (user) {
                logUser(user);
            } else {
                logOutUser();
            }
        });
    }, []);

    return (
        <LoginContext.Provider
            value={{
                state,
                logUser,
                logOutUser,
                checkuserisloggedin
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};
