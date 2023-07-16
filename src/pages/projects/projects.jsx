import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalCard } from "../../cmp/card/card";
import "../../globalStyle.scss";
import projectImg from "../../images/folder.png";
import { setProjects } from "../../redux/actions/projectActions";
import { getProjects } from "../../serverApi/rest/projectApi.js";
import "./projects.scss";
const makecards = (projects) => {
  return projects.map((currProject) => {
    return (
      <GlobalCard
        imgUrl={projectImg}
        key={currProject._id}
        id={currProject._id}
        title={currProject.title}
        linkTo={`/project/${currProject._id}`}
        description={`${new Date(
          currProject.startDate
        ).toLocaleDateString()} ↔  ${new Date(
          currProject.endDate
        ).toLocaleDateString()}`}
        moreDescription={currProject.description}
      />
    );
  });
};

export function ProjectsPage() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [projects, setProjectsList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setProjectsList(user.projectsRefs);
      const res = await getProjects();
      setProjectsList(res.projects);
      user.projectsRefs = res.projects;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setProjects(projects));
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchProjects();
    }
  }, []);

  return (
    <>
      <div className="projects">
        <div className="title-project title-header">My Projects</div>
        <div className="projects-container">
          {projects && (
            <div className="cards-container">{makecards(projects)}</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
