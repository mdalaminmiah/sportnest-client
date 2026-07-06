// app/layout.js
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext'; // 🎯 Placed at the absolute root
import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className="min-h-screen flex flex-col bg-base-100 text-base-content antialiased"
                suppressHydrationWarning
            >
                {/* 🎯 AuthProvider wraps everything first */}
                <AuthProvider>
                    <ThemeProvider>
                        {/* Render the rest of the application */}
                        {children}

                        {/* Global notification configuration */}
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 4000,
                                style: {
                                    background: '#0f172a',
                                    color: '#f1f5f9',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    padding: '14px 18px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                },
                                success: {
                                    iconTheme: {
                                        primary: '#ea580c',
                                        secondary: '#fff',
                                    },
                                },
                                error: {
                                    iconTheme: {
                                        primary: '#ef4444',
                                        secondary: '#fff',
                                    },
                                },
                            }}
                        />
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
