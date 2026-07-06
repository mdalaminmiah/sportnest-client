// Private area layout: same Navbar + Footer as the public site for a
// consistent look, wrapped in the ProtectedRoute session guard so a
// reload never bounces a logged-in user to /login.
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="grow w-full overflow-x-hidden bg-base-200/30 min-h-[70vh]">
                <ProtectedRoute>{children}</ProtectedRoute>
            </main>
            <Footer />
        </>
    );
}
