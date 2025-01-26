import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage"; 
import UserPage from "./pages/UserPage"; 
import Header from "./components/Header/Header";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/users" element={<UsersPage />} /> 
          <Route path="/users/:userId" element={<UserPage />} /> 
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;