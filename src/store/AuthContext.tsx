import React, { ReactNode, createContext, useState } from "react";

export type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const initialAuthState = localStorage.getItem("isAuthenticated") === "true";
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);

    const values: AuthContextType = {
        isAuthenticated,
        setIsAuthenticated,
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
