import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Alert from "./components/Alert";
import UserCard from "./components/UserCard";
import { useState } from "react";

function App() {
  // State to store alert messages
  const [alert, setAlert] = useState(null);

  const handleAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  return (
    <div>
      {/* Alert component */}
      {alert && <Alert alert={alert} />}
      <Navbar />
      <Home handleAlert={handleAlert} />
      <UserCard handleAlert={handleAlert} />
    </div>
  );
}

export default App;
