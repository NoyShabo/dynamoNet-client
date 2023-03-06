import React, { useEffect, useState } from "react";
import "./favoriteNodes.scss";

export function AddNewNode({ addNode }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    value && addNode(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Enter the new username…"
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

  const addNode = (name) => setNodes([...nodes, { name }]);

  const removeNode = (index) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  };

  useEffect(() => {
    setNodes(favoriteNodes);
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
          <AddNewNode addNode={addNode} />
        </div>
      </div>
    </>
  );
}
