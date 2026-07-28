import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import WebHeader from "./components/WebHeader";
import Caesar from "./pages/Caesar";
import Atbash from "./pages/Atbash";
import History from "./pages/history";
import TranspositionPage from "./pages/Transposition";
import WebFooter from "./components/WebFooter";

function App(){
  return(
  <><div className="bg-gray-900">
  <WebHeader/>
  <Routes>
    <Route path="/History/" element={<History/>}/>
    <Route path="/home/" element={<Home/>}/>
    <Route path="/caesar/" element={<Caesar/>}/>
    <Route path="/atbash/" element={<Atbash/>}/>
    <Route path="/transposition" element={<TranspositionPage/>}/>
  </Routes>
  <WebFooter/>
  </div>
</>
)
}
export default App
