import { createContext, useState } from "react";

interface ContextProps {
    loading: boolean;
    setLoading?: (loading: boolean) => void;
}

export const LoadingContext = createContext<ContextProps>({ loading: false });

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};