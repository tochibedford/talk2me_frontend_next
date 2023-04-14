import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function NavLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}