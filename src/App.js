import appleStock from "@visx/mock-data/lib/mocks/appleStock";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AreaChart } from "./cmp/area-chart/area-chart";
import { BarChart } from "./cmp/bar-chart/bar-chart";
import { Navbar } from "./cmp/navbar/navbar";
import { DisplayGraph } from "./cmp/network-graph/networkGraph";
import { NodeCard } from "./cmp/node-details/nodeDetails";
import { PieChart } from "./cmp/pie/pie";
import { MultiTableDrag } from "./cmp/table/table";
import { FormNewProject } from "./pages/form-new-project/form";
import { LoginPage } from "./pages/login-signup/loginSignup";
import { NodesPage } from "./pages/nodesMetrics/nodesMetrics";
import { Profile } from "./pages/profile/profile";
import { Project } from "./pages/project/project";
import { ProjectsPage } from "./pages/projects/projects";
import { Timerange } from "./pages/timerange/timerange";

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
            path="/areaChart"
            element={
              <AreaChart width={600} height={600} dataArray={appleStock} />
            }
          />
          <Route
            path="/networkGraph"
            element={<DisplayGraph width="100vw" height="100vh" />}
          />
          <Route
            path="/project/:projectId/timeRange/:timeRangeId"
            element={<Timerange />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/table" element={<MultiTableDrag />} />
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/nodes" element={<NodesPage />} />
          <Route path="/nodeCard" element={<NodeCard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
