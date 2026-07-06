'use client';
import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('sportnest-theme') || 'light';
        }
        return 'light';
    });
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('sportnest-theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// At the bottom of src/context/ThemeContext.jsx
export function useTheme() {
    const context = useContext(ThemeContext);

    // Safety fallback guard to prevent "cannot destructure property of undefined" crashes
    if (!context) {
        return {
            theme: 'light',
            toggleTheme: () => {},
        };
    }

    return context;
}
