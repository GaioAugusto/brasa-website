import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { Board } from "./components/Board";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <main className="bg-gray-100 mt-16">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          {/* Board Page */}
          <Route path="/board" element={<Board />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
