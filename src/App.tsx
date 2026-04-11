import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./contexts/auth";
import { AccountMenu } from "./pages/Account";
import { Board } from "./pages/Board";
import { BusinessesPage } from "./pages/Businesses";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { Opportunities } from "./pages/Opportunities";
import { PastEvents } from "./pages/PastEvents";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <main className="bg-gray-100 mt-16">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/board" element={<Board />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/opportunities"
                            element={<Opportunities />}
                        />
                        <Route
                            path="/opportunities/businesses"
                            element={<BusinessesPage />}
                        />
                        <Route path="/events" element={<PastEvents />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/account" element={<AccountMenu />} />
                    </Routes>
                    <Footer />
                </main>
            </Router>
        </AuthProvider>
    );
}

export default App;
