import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { Board } from "./components/Board";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Opportunities } from "./components/Opportunities";
import { PastEvents } from "./components/PastEvents";

function App() {
  return (
    <Router>
      {/* Fixed Navbar */}
      <NavBar />
      {/* Add margin or padding at the top to offset the fixed NavBar */}
      <main className="bg-gray-100 mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/events" element={<PastEvents />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
