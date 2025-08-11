import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import AnimalList from "./pages/AnimalList";
import AnimalDetail from "./pages/AnimalDetail";
import { AnimalProvider } from "./contexts/AnimalContext";

function App() {
  return (
    <AnimalProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<AnimalList />} />
        <Route path="/animals/:id" element={<AnimalDetail />} />
      </Routes>
    </BrowserRouter>
    </AnimalProvider>
  );
}

export default App;