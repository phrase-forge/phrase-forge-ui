import { createContext, useState } from "react";
import { ApplicationUser } from "../model/ApplicationUser";

interface ContextProps {
    user: ApplicationUser;
    setUser: (user) => void;
}

export const UserContext = createContext<ContextProps | null>(null);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>;
};