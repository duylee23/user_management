import React from "react";

const UserContext = React.createContext({email : '', auth: false})

const UserProvider = ({children}) => {
    const [user, setUser ] = React.useState({email: '', auth :false})

    const login = (email, token) => {
        setUser ((user) => ({
            email: email, 
            auth: true, 
        }))
        localStorage.setItem('token', token)
    }

    const logout = () => {
        localStorage.removeItem('token') 
        setUser((user) => ({
            email: '',
            auth: false
        }))
    }

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}