import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addFavoriteNodeToProject,
  getNode,
  removeFavoriteNodeFromProject,
} from "../../serverApi/rest/nodeApi";
import { NodeCard } from "../node-details/nodeDetails";
import "./favoriteNodes.scss";

export function AddNewNode({ addNode }) {
  const [value, setValue] = useState("");
  const { projectId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;
    try {
      const res = await addFavoriteNodeToProject(projectId, value);
      addNode(value);
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="username"
        onChange={(e) => setValue(e.target.value)}
        className="node-input"
      />
      <button type="submit">
        <i className="fas fa-plus"></i>
      </button>
      <ToastContainer />
    </form>
  );
}

export function FavoriteNodes({
  selectedNode,
  setSelectedNode,
  setSelectedNodes,
  favoriteNodes,
}) {
  const [nodes, setNodes] = useState([]);
  const { projectId } = useParams();
  const [checkedNodes, setCheckedNodes] = useState([]);
  const [nodeSelected, setNodeSelected] = useState({});

  const getNodeSelectedDetails = async (nodeName) => {
    try {
      const res = await getNode(nodeName);
      setNodeSelected(res.node);
    } catch (err) {
      console.log("err: ", err);
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (selectedNode) getNodeSelectedDetails(selectedNode);
  }, [selectedNode]);

  const addNode = (name) => {
    setNodes([...nodes, name]);
    setSelectedNode(name);
  };

  const handleCheckboxChange = (e, node) => {
    const { checked } = e.target;
    let newCheckedNodes = [...checkedNodes];
    if (checked) {
      newCheckedNodes.push(node);
    } else {
      const index = newCheckedNodes.indexOf(node);
      newCheckedNodes.splice(index, 1);
    }
    setCheckedNodes(newCheckedNodes);
    setSelectedNodes(newCheckedNodes);
  };

  const removeNode = async (index) => {
    try {
      const res = await removeFavoriteNodeFromProject(projectId, nodes[index]);
      const newNodes = [...nodes];
      newNodes.splice(index, 1);
      setNodes(newNodes);
      if (newNodes.length > 0) setSelectedNode(newNodes[0]);
      else setSelectedNode(null);
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    setNodes(favoriteNodes);
    if (favoriteNodes.length) setSelectedNode(favoriteNodes[0]);
  }, [favoriteNodes]);

  return (
    <div className="favoriteNodes-wrapper">
      <div className="favoriteNodes">
        <h1>Favorite Nodes</h1>
        <div className="nodes-list">
          {nodes &&
            nodes.map((node, index) => (
              <div style={{ display: "flex" }} key={`container-${node}`}>
                <input
                  type="checkbox"
                  className="node-checkbox"
                  onChange={(e) => handleCheckboxChange(e, node)}
                />
                <div
                  key={node}
                  className="node"
                  onClick={() => setSelectedNode(node)}
                >
                  <span className="node-text">{node}</span>
                  <button onClick={() => removeNode(index)}>
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
              </div>
            ))}
          <AddNewNode addNode={addNode} />
        </div>
      </div>
      <div className="node-card">
        <NodeCard nodeDetails={nodeSelected}></NodeCard>
      </div>
      <ToastContainer />
    </div>
  );
}
