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
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
    
  useEffect(() => {
    const root = document.documentElement;

    root?.style.setProperty(
      "--first-color",
      darkTheme ? "#feffdf" : "#262833"
    );

    root?.style.setProperty(
      "--third-color",
      darkTheme ? "#97cba9" : "#404040"
    );

    root?.style.setProperty(
      "--fourth-color",
      darkTheme ? "#262833" : "#fff"
    );
  }, [darkTheme]);

  return (
    <div className="App">
      <DataProvider>
        <ThemeToggler darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
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
            element={<MapView darkTheme={darkTheme} />}
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


