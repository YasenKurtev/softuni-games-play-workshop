import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext();

export let AuthProvider = ({ children }) => {
    let [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        setUser(state => state = JSON.parse(localStorage.getItem('user')));
    }, [])

    return (
        <AuthContext.Provider value={{ user: user, setUser: setUser }}>
            {children}
        </AuthContext.Provider>
    )
}