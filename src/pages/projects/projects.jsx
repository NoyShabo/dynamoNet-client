import { useEffect } from "react";
import { GlobalCard } from "../../cmp/card/card"
import "./projects.scss"
import '../../globalStyle.scss'
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../serverApi/rest/projectApi.js";
import { setProjects } from '../../redux/actions/projectActions'

const makecards = (projects) =>{
  console.log("projects: ", projects);
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
  const projects = useSelector((state)=>state.projectModule.projects);
  const dispatch = useDispatch();

  const fetchProjects = async ()=>{
    try{
      const res = await getProjects();
      dispatch(setProjects(res));
    }
    catch(e){
      console.log(e);
    }
    
  }

  useEffect(()=>{
    fetchProjects();
   },[]);

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