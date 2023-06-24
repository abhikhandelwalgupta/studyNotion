import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import NavBar from "./components/comman/NavBar";

function App() {
  return (
    <div className="w-screen min-h-screen  scroll-smooth	relative bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
