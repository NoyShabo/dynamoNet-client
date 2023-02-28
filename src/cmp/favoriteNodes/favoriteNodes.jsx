import React, { useState } from 'react'
import './favoriteNodes.scss'


export function AddNewNode({ addNode }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        value && addNode(value)
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                placeholder="Enter the new username…"
                onChange={e => setValue(e.target.value)}
            />
            <button type="submit"><i className="fas fa-plus"></i></button>
        </form>
    );
}

export function FavoriteNodes() {

    const [nodes, setNodes] = useState([{
        name: "Noy Sabo",
        isSelected: false
    }, {
        name: "Adi peled",
        isSelected: false
    }, {
        name: "noor haj dawood",
        isSelected: false
    }]);




    const addNode = name => setNodes([...nodes, { name }]);

    const toggleTask = index => {
        const newTasks = [...nodes];
        newTasks[index].isCompleted = !newTasks[index].isCompleted;
        setNodes(newTasks);
    };

    const removeNode = index => {
        const newNodes = [...nodes];
        newNodes.splice(index, 1);
        setNodes(newNodes);
    };

    return (<>
            <div className='favoriteNodes'>
                <h1>Favorite Nodes</h1>
                <div className="nodes-list">
                    {nodes.map((node, index) => (
                        <div className="node">
                            <span>
                                {node.name}
                            </span>
                            <button onClick={() => removeNode(index)}><i className="fa fa-minus"></i></button>
                        </div>
                    ))}
                    <AddNewNode addNode={addNode} />
                </div>
            </div>
    </>
    );
}

