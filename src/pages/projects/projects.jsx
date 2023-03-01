import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalCard } from "../../cmp/card/card";
import "../../globalStyle.scss";
import projectImg from "../../images/project_folder.png";
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

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      dispatch(setProjects(res));
    } catch (e) {
      console.error("error fetching projects!: ", e);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="projects">
      <div className="projects-container">
        <div className="title-project ">My Projects</div>
        <div className="small-title-project">All My Projects</div>
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
  );
}
