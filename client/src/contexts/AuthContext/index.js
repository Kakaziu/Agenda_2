import React, { useState, createContext } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }){

    const [user, setUser] = useState(false)

    return(
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
}