import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { toast, ToastContainer } from "react-toastify";
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
  // const projects = useSelector((state) => state.projectModule.projects);
  // const user = useSelector((state) => state.userModule.user);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [projects, setProjectsList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      // const res = await getProjects();
      // console.log("res: ", res);
      setProjectsList(user.projectsRefs);
      dispatch(setProjects(projects));
    } catch (e) {
      // console.error("error fetching projects!: ", e);
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  useEffect(() => {
    if (!user) {
      navigate("/pageNotFound");
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
          {/* {(!projects || projects.length === 0) && (
            <div className="cards-container title-project">
              <span style={{ textAlign: "center" }}>
                Loading Projects <BeatLoader color="#36d7b7" />
              </span>
            </div>
          )} */}
          {/* <div className="cards-container">
                {makecards(projects)}
            </div> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
