import { CardTimeRange } from "../../cmp/card/card"
import projects from "../../data/projects.json";

import "./projects.scss"
import '../../globalStyle.scss'

const projectsArray = projects.projects;
const cards = projectsArray.map((currProject) => {
  return (
    <CardTimeRange
      key={currProject._id}
      id={currProject._id}
      title={currProject.title}
      description={`${new Date(
        currProject.startDate
      ).toLocaleDateString()} ↔  ${new Date(
        currProject.endDate
      ).toLocaleDateString()}`}
      moreDescription={currProject.description}
    />
  );
});

cards.push(
    <CardTimeRange
      key="55"
      title="The best Title"
      description={`${new Date().toLocaleDateString()} ↔  
        ${new Date().toLocaleDateString()}`}
      moreDescription="this is a descriptionnnnnnnnnnnnnnnnnnn"
    />
)
cards.push(
    <CardTimeRange
      key="56"
      title="The best Title"
      description={`${new Date().toLocaleDateString()} ↔  
        ${new Date().toLocaleDateString()}`}
      moreDescription="this is a descriptionnnnnnnnnnnnnnnnnnn"
    />
)


export function ProjectsPage(){
    return (
    <div className="projects">
         <div className="projects-container">
            <div className="title-project ">My Projects</div>
            <div className="small-title-project">All My Projects</div>
            <div className="cards-container">
                {cards}
            </div>
         </div>
    </div>)
}