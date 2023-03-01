import { GlobalCard } from "../../cmp/card/card"
import "./projects.scss"
import '../../globalStyle.scss'
import { useSelector } from "react-redux";

const makecards = (projects) =>{
  return projects.map((currProject) => {
    return (
      <GlobalCard
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
}

export function ProjectsPage(){

  const projects = useSelector((state)=>state.allProjects.projects);
    return (
    <div className="projects">
         <div className="projects-container">
            <div className="title-project ">My Projects</div>
            <div className="small-title-project">All My Projects</div>
            <div className="cards-container">
                {makecards(projects)}
            </div>
         </div>
    </div>)
}