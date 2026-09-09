import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./contexts/auth";
import { AccountMenu } from "./pages/Account";
import { Board } from "./pages/Board";
import { BusinessesPage } from "./pages/Businesses";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";
import { Opportunities } from "./pages/Opportunities";
import { PastEvents } from "./pages/PastEvents";
import { RegisterPage } from "./pages/RegisterPage";
import { useSeo } from "./seo/useSeo";

/**
 * Lives inside the Router so it can read the active route: useSeo needs
 * useLocation to keep <head> in sync with the page being shown.
 */
function AppShell() {
    useSeo();

    return (
        <>
            <NavBar />
            <main className="bg-gray-100 mt-16">
                <Breadcrumbs />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/opportunities" element={<Opportunities />} />
                    <Route
                        path="/opportunities/businesses"
                        element={<BusinessesPage />}
                    />
                    <Route path="/events" element={<PastEvents />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/account" element={<AccountMenu />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </main>
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppShell />
            </Router>
        </AuthProvider>
    );
}

export default App;
