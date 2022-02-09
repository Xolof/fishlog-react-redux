import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header title="React Fishlog" />
      <Nav />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer /> 
    </div>
  );
}

export default App;


