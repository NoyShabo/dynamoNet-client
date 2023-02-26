import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ReactGraphVis from "./cmp/network-graph-vis/networkGraphVis";
import { FormNewProject } from "./pages/form-new-project/form";
import { LoginPage } from "./pages/login-signup/loginSignup";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ReactGraphVis />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/form" element={<FormNewProject />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
