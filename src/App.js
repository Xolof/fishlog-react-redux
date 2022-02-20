import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import List from "./components/List";
import MapView from "./components/MapView";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/Login";
import About from "./components/About";
import NotFound from "./components/NotFound";
import ThemeToggler from "./components/ThemeToggler";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <ThemeToggler />
        <Header title="React Fishlog" />
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<List />}
          />
          <Route
            path="/add"
            element={<Add />}
          />
          <Route
            path="/edit/:id"
            element={<Edit />}
          />
          <Route
            path="/map/:id"
            element={<MapView />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;


