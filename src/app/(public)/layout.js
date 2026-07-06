// app/(public)/layout.js
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export default function PublicLayout({ children }) {
    return (
        <>
            {/* Navbar safely reads from the global AuthProvider wrapper */}
            <Navbar />
            <main className="grow w-full overflow-x-hidden">{children}</main>
            <Footer />
        </>
    );
}
