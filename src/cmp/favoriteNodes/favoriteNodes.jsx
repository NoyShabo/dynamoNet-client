import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addFavoriteNodeToProject,
  removeFavoriteNodeFromProject,
} from "../../serverApi/rest/nodeApi";
import { NotificationPopup } from "../notification-popup/notificationPopup";
import "./favoriteNodes.scss";

export function AddNewNode({ addNode, setError, setShowNotification }) {
  const [value, setValue] = useState("");
  const { projectId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;
    try {
      const res = await addFavoriteNodeToProject(projectId, value);
      addNode(value);
    } catch (err) {
      setError(err);
      setShowNotification(true);
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
    </form>
  );
}

export function FavoriteNodes({
  setSelectedNode,
  setSelectedNodes,
  favoriteNodes,
}) {
  const [nodes, setNodes] = useState([]);
  const { projectId } = useParams();
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [checkedNodes, setCheckedNodes] = useState([]);

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
      if (newNodes.length) setSelectedNode(newNodes[0]);
      else setSelectedNode(null);
    } catch (err) {
      setError(err);
      setShowNotification(true);
    }
  };

  useEffect(() => {
    setNodes(favoriteNodes);
    if (favoriteNodes.length) setSelectedNode(favoriteNodes[0]);
  }, [favoriteNodes]);

  return (
    <>
      <div className="favoriteNodes">
        <h1>Favorite Nodes</h1>
        <div className="nodes-list">
          {nodes &&
            nodes.map((node, index) => (
              <div
                key={node}
                className="node"
                onClick={() => setSelectedNode(node)}
              >
                <div>
                  <input
                    type="checkbox"
                    className="node-checkbox"
                    onChange={(e) => handleCheckboxChange(e, node)}
                  />
                  <span>{node}</span>
                </div>
                <button onClick={() => removeNode(index)}>
                  <i className="fa fa-minus"></i>
                </button>
              </div>
            ))}
          <AddNewNode
            addNode={addNode}
            setError={setError}
            setShowNotification={setShowNotification}
          />
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
