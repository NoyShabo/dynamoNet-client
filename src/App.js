import appleStock from "@visx/mock-data/lib/mocks/appleStock";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { BarChart } from "./cmp/bar-chart/bar-chart";
import { AreaChart } from "./cmp/line-chart/line-chart";
import { DisplayGraph } from "./cmp/network-graph/networkGraph";
import { PieChart } from "./cmp/pie/pie";
import { MultiTableDrag } from "./cmp/table/table";
import { FormNewProject } from "./pages/form-new-project/form";
import { LoginPage } from "./pages/login-signup/loginSignup";
import { Timerange } from "./pages/timerange/timerange";
import { Navbar } from "./cmp/navbar/navbar";
import { Profile } from "./pages/profile/profile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/addProject" element={<FormNewProject />} />
          <Route
            path="/barChart"
            element={<BarChart width={700} height={500} />}
          />
          <Route
            path="/pieChart"
            element={<PieChart width={700} height={500} />}
          />
          <Route
            path="/chart"
            element={
              <AreaChart width={600} height={600} dataArray={appleStock} />
            }
          />
          <Route
            path="/networkGraph"
            element={<DisplayGraph width="100vw" height="100vh" />}
          />
          <Route path="/timeRange" element={<Timerange />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/table" element={<MultiTableDrag />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
