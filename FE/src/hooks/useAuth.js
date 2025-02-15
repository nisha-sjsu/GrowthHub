import React from "react";
import { isUserSignedIn } from "../utils";


const authContext  = React.createContext();

function useAuth(){
    const [authed, setAuthed] = React.useState(isUserSignedIn());
    return {
        authed,
        login(){
            return new Promise((res) => {
                setAuthed(true);
                res();
            });
        },
        logout(){
            return new Promise((res) => {
                localStorage.clear();
                setAuthed(false);
                res();
            })
        }
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}
