import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Contact } from "./pages/Contact";
import { Footer } from "./components/Footer";
import { Opportunities } from "./pages/Opportunities";
import { PastEvents } from "./pages/PastEvents";
import { Home } from "./pages/Home";
import { Board } from "./pages/Board";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
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
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
