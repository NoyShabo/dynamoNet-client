import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addFavoriteNodeToProject,
  removeFavoriteNodeFromProject,
} from "../../serverApi/rest/nodeApi";
import "./favoriteNodes.scss";

export function AddNewNode({ addNode, setError, setShowNotification }) {
  const [value, setValue] = useState("");
  const { projectId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;
    try {
      const res = await addFavoriteNodeToProject(projectId, value);
      console.log("add node res: ", res);
      addNode(value);
    } catch (err) {
      setError(`Could not add node, check if the node name is correct`);
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
      />
      <button type="submit">
        <i className="fas fa-plus"></i>
      </button>
    </form>
  );
}

export function FavoriteNodes({ setSelectedNode, favoriteNodes }) {
  const [nodes, setNodes] = useState([]);
  const { projectId } = useParams();
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const addNode = (name) => {
    setNodes([...nodes, name]);
    setSelectedNode(name);
  };

  const removeNode = async (index) => {
    try {
      const res = await removeFavoriteNodeFromProject(projectId, nodes[index]);
      console.log("remove node res: ", res);
      const newNodes = [...nodes];
      newNodes.splice(index, 1);
      setNodes(newNodes);
      if (newNodes.length) setSelectedNode(newNodes[0]);
      else setSelectedNode(null);
    } catch (err) {
      setError(`Could not remove node, please try again later`);
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
                <span>{node}</span>
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
      {showNotification && (
        <div className="notification">
          <p>{error}</p>
          <button onClick={() => setShowNotification(false)}>Close</button>
        </div>
      )}
    </>
  );
}
