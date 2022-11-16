import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Minesweeper from "./pages/Minesweeper";
import Navbar from "./components/Navbar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar/>
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/Minesweeper" element={<Minesweeper />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
