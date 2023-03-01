import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BarChart } from "../../cmp/bar-chart/bar-chart";
import { GlobalCard } from "../../cmp/card/card";
import { Delete } from "../../cmp/delete/delete";
import { Edit } from "../../cmp/edit/edit";
import { LineChart } from "../../cmp/line-chart/line-chart";
import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";
import { Scroll } from "../../cmp/scroll/scroll";
import "../../globalStyle.scss";
import calendarImg from "../../images/calendar.png";
import {
  removeSelectedProject,
  setProject,
} from "../../redux/actions/projectActions";
import { getProject, updateProject } from "../../serverApi/rest/projectApi";
import "./project.scss";

function getTimeRangeCards(project) {
  const timeRanges = project.timeRanges;
  const cards = timeRanges.map((timeRange) => {
    return (
      <GlobalCard
        imgUrl={calendarImg}
        key={timeRange._id}
        id={timeRange._id}
        linkTo={`/timeRange/${timeRange._id}`}
        title={timeRange.title}
        description={`${new Date(
          timeRange.startDate
        ).toLocaleDateString()} ↔  ${new Date(
          timeRange.endDate
        ).toLocaleDateString()}`}
      />
    );
  });
  return cards;
}

export function Project() {
  const project = useSelector((state) => state.projectModule.project);
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [numberOfNodes, setNumberOfNodes] = useState([]);
  const [numberOfEdges, setNumberOfEdges] = useState([]);
  const [density, setDensity] = useState([]);
  const [reciprocity, setReciprocity] = useState([]);
  const [degreeCentrality, setDegreeCentrality] = useState([
    { id: "Degree Centrality", data: [] },
  ]);
  const [radius, setRadius] = useState([{ id: "Radius", data: [] }]);
  const [diameter, setDiameter] = useState([{ id: "Diameter", data: [] }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function setMetrics(timeRanges) {
    const numberOfNodes = [];
    const numberOfEdges = [];
    const density = [];
    const reciprocity = [];
    const degreeCentrality = [{ id: "Degree Centrality", data: [] }];
    const radius = [{ id: "Radius", data: [] }];
    const diameter = [{ id: "Diameter", data: [] }];
    timeRanges.forEach((timeRange) => {
      numberOfNodes.push({
        window: timeRange.title,
        frequency: timeRange.network.networkMetrics.numberOfNodes,
        key: `${timeRange._id}-numberOfNodes`,
      });
      numberOfEdges.push({
        window: timeRange.title,
        frequency: timeRange.network.networkMetrics.numberOfEdges,
        key: `${timeRange._id}-numberOfEdges`,
      });
      density.push({
        window: timeRange.title,
        frequency: timeRange.network.networkMetrics.density,
        key: `${timeRange._id}-density`,
      });
      reciprocity.push({
        window: timeRange.title,
        frequency: timeRange.network.networkMetrics.reciprocity,
        key: `${timeRange._id}-reciprocity`,
      });
      degreeCentrality[0].data.push({
        x: timeRange.title,
        y: timeRange.network.networkMetrics.degreeCentrality,
      });
      radius[0].data.push({
        x: timeRange.title,
        y: timeRange.network.networkMetrics.radius,
      });
      diameter[0].data.push({
        x: timeRange.title,
        y: timeRange.network.networkMetrics.diameter,
      });
    });
    setNumberOfNodes(numberOfNodes);
    setNumberOfEdges(numberOfEdges);
    setDensity(density);
    setReciprocity(reciprocity);
    setDegreeCentrality(degreeCentrality);
    setRadius(radius);
    setDiameter(diameter);
  }

  const getProjectById = async (id) => {
    const res = await getProject(id);
    dispatch(setProject(res));
  };

  useEffect(() => {
    if (projectId && projectId !== "") getProjectById(projectId);
    return () => {
      dispatch(removeSelectedProject());
    };
  }, []);

  useEffect(() => {
    if (project) {
      setMetrics(project.timeRanges);
      setTitle(project.title);
      setDescription(project.description);
    }
  }, [project]);

  const handleDelete = (id) => {
    console.log("Delete");
  };

  const handleEdit = async (values) => {
    const newVales = {};
    if (values[0]) newVales.title = values[0];
    if (values[1]) newVales.description = values[1];

    try {
      const res = await updateProject(projectId, newVales);
      project.title = res.project.title;
      project.description = res.project.description;
      setTitle(res.project.title);
      setDescription(res.project.description);
    } catch (err) {
      console.log(JSON.stringify(err));
      // notify user about error
    }
  };

  return (
    <div className="project-page">
      {!project ? (
        <div className="project-container title-project">Loading...</div>
      ) : (
        <div className="project-container">
          <div className="project-header">
            <Edit
              inputs={[
                {
                  type: "text",
                  value: title || project.title,
                  className: "title-project",
                },
                {
                  type: "text",
                  value: description || project.description,
                  className: "small-title-project",
                },
              ]}
              onSubmit={handleEdit}
            />
            <Scroll items={getTimeRangeCards(project)} />
          </div>
          {project.timeRanges.length === 0 ? (
            <div className="small-title-project">No Time Ranges</div>
          ) : (
            <div className="network-evolution">
              <div className="title-project">Network Evolution</div>
              <div className="small-title-project">
                Evolution by all Time ranges
              </div>

              <div className="charts-list">
                <div className="chart-container">
                  <div className="small-title-project">
                    Number of Nodes Evolution
                  </div>
                  <BarChart
                    width={100 * numberOfNodes.length}
                    height={400}
                    data={numberOfNodes}
                  />
                </div>
                <div className="chart-container">
                  <div className="small-title-project">
                    Number of Edges Evolution
                  </div>
                  <BarChart
                    width={100 * numberOfEdges.length}
                    height={400}
                    data={numberOfEdges}
                  />
                </div>
                <div className="chart-container">
                  <div className="small-title-project">Density Evolution</div>
                  <BarChart
                    width={100 * density.length}
                    height={400}
                    data={density}
                  />
                </div>
                {/* <div className='chart-container'>
                                      <div className='small-title-project'>Degree Centrality Evolution</div>
                                      <BarChart width={100*degreeCentrality.length} height={400} data={degreeCentrality}/>
                                  </div> */}
                {/* <div className='chart-container'>
                                      <div className='small-title-project'>Diameter Evolution</div>
                                      <BarChart width={100*diameter.length} height={400} data={diameter}/>
                                  </div>
                                  <div className='chart-container'>
                                      <div className='small-title-project'>Radius Evolution</div>
                                      <BarChart width={100*radius.length} height={400} data={radius}/>
                                  </div> */}
                <div className="chart-container">
                  <div className="small-title-project">
                    Reciprocity Evolution
                  </div>
                  <BarChart
                    width={100 * reciprocity.length}
                    height={400}
                    data={reciprocity}
                  />
                </div>

                <div className="chart-container chart-container-line">
                  <div className="small-title-project">
                    Degree Centrality Evolution
                  </div>
                  <LineChart data={degreeCentrality} />
                </div>
                <div className="chart-container chart-container-line">
                  <div className="small-title-project">Radius Evolution</div>
                  <LineChart data={radius} />
                </div>
                <div className="chart-container chart-container-line">
                  <div className="small-title-project">Diameter Evolution</div>
                  <LineChart data={diameter} />
                </div>
              </div>
            </div>
          )}
          <div className="source-network">
            <div className="title-project">Source Network</div>
            <div className="small-title-project">
              Metrics for the source network
            </div>
            <NetworkMetrics network={project.sourceNetwork} />
          </div>
          <Delete onDelete={handleDelete} title={`Delete Project: ${title}`} />
        </div>
      )}
    </div>
  );
}
