import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext()

export default AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const providerValue = React.useMemo(() => ({
        isLoggedIn, setIsLoggedIn
    }), [isLoggedIn]);

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
}