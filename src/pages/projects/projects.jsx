import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalCard } from "../../cmp/card/card";
import { NotificationPopup } from "../../cmp/notification-popup/notificationPopup";
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
  const projects = useSelector((state) => state.projectModule.projects);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      dispatch(setProjects(res));
    } catch (e) {
      // console.error("error fetching projects!: ", e);
      setError(e);
      setShowNotification(true);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <div className="projects">
        <div className="projects-container">
          <div className="title-project ">My Projects</div>
          {projects && (
            <div className="cards-container">{makecards(projects)}</div>
          )}
          {!projects && (
            <div className="cards-container title-project">Loading...</div>
          )}
          {/* <div className="cards-container">
                {makecards(projects)}
            </div> */}
        </div>
      </div>
      <NotificationPopup
        message={error}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </>
  );
}
