"use client";
import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName] = useState('Usuario');

    const pathname = usePathname();
    const isPurchasePage = pathname.split('/').length === 0 || pathname === '/';
    
    const value = {
        searchQuery,
        setSearchQuery,
        isUserMenuOpen,
        setIsUserMenuOpen,
        isAuthenticated,
        setIsAuthenticated,
        userName,
        isPurchasePage
    };

    return (
        <NavBarContext.Provider value={value}>
            {children}
        </NavBarContext.Provider>
    );
}

export const useNavBarContext = () => {
    const context = useContext(NavBarContext);
    if (!context) {
        throw new Error("useNavBarContext must be used within a NavBarProvider");
    }
    return context;
    }
