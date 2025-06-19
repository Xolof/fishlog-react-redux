import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import StartPage from "./components/StartPage";
import List from "./components/items/List";
import MapView from "./components/show/MapView";
import Add from "./components/addedit/Add";
import Edit from "./components/addedit/Edit";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import NotFound from "./components/NotFound";
import ThemeToggler from "./components/layout/ThemeToggler";
import { Route, Routes } from "react-router-dom";
import VerifyToken from "./services/VerifyToken";

function App() {
  return (
    <div className="App">
      <VerifyToken />
      <ThemeToggler />
      <Header title="Fishlog" />
      <Nav />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/list" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/map/:id" element={<MapView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
