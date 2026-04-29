import Navbar from "./layout/Navbar";
import Register from "./pages/Register";
// import Dashbord from "./pages/Dashbord";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Signout from "./components/Signout";
import Dashboard from "./pages/Dashboard";
import Todo from "./pages/Todo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { storeContext } from "./context/storeContext";

function App() {
  const { isAuth } = useContext(storeContext);

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={isAuth ? <Dashboard /> : <Home />} />
        <Route
          path="/register"
          element={isAuth ? <Dashboard /> : <Register />}
        />
        <Route path="/login" element={isAuth ? <Dashboard /> : <Login />} />
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Login />} />
        <Route path="/signout" element={isAuth ? <Signout /> : <Login />} />
        <Route path="/todo/:id" element={isAuth ? <Todo /> : <Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
