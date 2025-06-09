"use client";
import { createContext, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
  // Estados para manejar la barra de navegación se movieron al contexto
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const isPurchasePage = pathname.split('/').length === 0 || pathname === '/';
    
    // Función para manejar login exitoso
    const handleLogin = (username) => {
        setIsAuthenticated(true);
        setUserName(username);
        setShowLoginModal(false);
    };

    // Función para manejar logout
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserName('');
        setIsUserMenuOpen(false);
        router.push('/');
    };

    const value = {
        searchQuery,
        setSearchQuery,
        isUserMenuOpen,
        setIsUserMenuOpen,
        isAuthenticated,
        setIsAuthenticated,
        userName,
        isPurchasePage,
        showLoginModal,
        setShowLoginModal,
        handleLogin,
        handleLogout
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
