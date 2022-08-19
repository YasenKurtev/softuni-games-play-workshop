import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext();

export let AuthProvider = ({ children }) => {
    let [user, setUser] = useState(undefined);

    useEffect(() => {
        let storedUser = localStorage.getItem('user');
        storedUser === null ? setUser(state => state = undefined) : setUser(state => state = JSON.parse(storedUser));
    }, [])

    return (
        <AuthContext.Provider value={{ user: user, setUser: setUser }}>
            {children}
        </AuthContext.Provider>
    )
}