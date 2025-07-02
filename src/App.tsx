import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Contact } from "./pages/Contact";
import { Footer } from "./components/Footer";
import { Opportunities } from "./pages/Opportunities";
import { PastEvents } from "./pages/PastEvents";
import { Home } from "./pages/Home";
import { Board } from "./pages/Board";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/auth";
import { AccountMenu } from "./pages/Account";

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
            <Route path="/opportunities" element={<Opportunities />} />
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
