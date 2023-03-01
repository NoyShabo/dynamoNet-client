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

export function FavoriteNodes({setSelectedNode}) {

    const [nodes, setNodes] = useState([{
        _id: "63f61e5a43ed141319fe4084",
        twitterId: "74076264",
        name: "JoeBiden",
        screenName: "RevMaryLou",
        location: "Rochester, NY",
        description: "I am a retired minister and teacher. I am a singer/songwriter. I am poor. My son & I are medically disabled and share housing. I seek a just society.",
        followersCount: 328,
        friendsCount: 807,
        statusesCount: 28674,
        registrationDateTwitter: "2009-09-14"
    }, {
        name: "BernieSanders",
        isSelected: false
    }, {
        name: "KamalaHarris",
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
                        <div className="node" onClick={()=>setSelectedNode(node.name)}> 
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

