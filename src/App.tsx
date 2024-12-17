import "./App.css";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div>
      {" "}
      <NavBar />
      <main className="mt-16">
        {" "}
        <Home />
        <h1>Hello</h1>
      </main>
    </div>
  );
}

export default App;
