import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { Board } from "./components/Board";

function App() {
  return (
    <Router>
      <NavBar /> {/* The Navbar will remain fixed across pages */}
      <main className="mt-16">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          {/* Board Page */}
          <Route path="/board" element={<Board />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
