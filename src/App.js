import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socketIOClient from "socket.io-client";
import "./App.css";
import { Navbar } from "./cmp/navbar/navbar";
import { API_BASE_URL } from "./constants";
import { FormNewProjectCSV } from "./pages/form-new-project-csv/formNewProjectCsv";
import { FormNewProject } from "./pages/form-new-project/form";
import { FormNewTimeRanges } from "./pages/form-new-timeranges/formNewTimeRanges";
import { LoginPage } from "./pages/login-signup/loginSignup";
import { NodesPage } from "./pages/nodesMetrics/nodesMetrics";
import { PageNotFound } from "./pages/page-not-found/page-not-found";
import { Profile } from "./pages/profile/profile";
import { Project } from "./pages/project/project";
import { ProjectsPage } from "./pages/projects/projects";
import { Timerange } from "./pages/timerange/timerange";
import { setProject } from "./redux/actions/projectActions";
import { getProject } from "./serverApi/rest/projectApi";

function App() {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  const getProjectById = async (id) => {
    try {
      const res = await getProject(id);
      dispatch(setProject(res));
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    const newSocket = socketIOClient(API_BASE_URL);
    newSocket.on("timeRangesReady", (data) => {
      console.log("data", data);
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  const updateProject = (message, id) => {
    const project = JSON.parse(localStorage.getItem("project"));
    if (project && id === project._id) {
      getProjectById(id).then(() => {
        if (window.location.pathname.includes("/project/"))
          toast.success(message);
      });
    }

    // check if route is project page
    if (
      !window.location.pathname.includes("/project/") ||
      (project && id !== project._id)
    ) {
      toast.success(`${message}\nClick here to go to project.`, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClick: () => {
          window.location.href = `/project/${id}`;
        },
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("projectReady", (data) => {
        updateProject("Project ready.", data.projectId);
      });

      socket.on("newFavoriteNode", (data) => {
        updateProject("New favorite node added.", data.projectId);
      });

      socket.on("timeRangesReady", (data) => {
        updateProject("Time ranges are ready.", data.projectId);
      });
    }
  }, [socket]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addProject/csv" element={<FormNewProjectCSV />} />
          <Route path="/addProject/twitter" element={<FormNewProject />} />
          <Route
            path="/project/:projectId/timeRange/:timeRangeId"
            element={<Timerange />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="project/:projectId/nodes" element={<NodesPage />} />
          <Route
            path="/project/:projectId/network/:networkId/addTimeRanges"
            element={<FormNewTimeRanges />}
          />
          <Route path="/pageNotFound" element={<PageNotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
