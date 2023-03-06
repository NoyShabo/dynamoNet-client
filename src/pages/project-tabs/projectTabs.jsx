import React, { useEffect, useState } from "react";
import './projectTabs.scss'
import { Adi,Noor,Noy } from "../../cmp/adi/adi";
 import {NodesPage} from '../nodesMetrics/nodesMetrics'
const tabs = [
    {
        id: 1,
        name: "Network Evoulution",
        title: 'Colorables',
        text: "Nelsons folly lugger marooned hearties chantey lateen sail Yellow Jack gangplank .",
        component: <Adi />

    },
    {
        id: 2,
        name: "Node Evoulution",
        title: 'Acme Logos',
        text: "Barbary Coast hogshead port Sea Legs cackle fruit dead men tell no tales crimp poop",
        component: <NodesPage />

    },
    {
        id: 3,
        name: "Community Evoulution",
        title: 'Blocks wireframe',
        text: "Gangway boom coffer rigging tackle gabion Shiver me timbers aye draft barque. ",
        component: <Noy />

    }
];



function Tab(props) {
    return (
        <div className={`tabs__content`}>
            <h3>{props.tab.title}</h3>
            {props.tab.component}
        </div>
    );
}

function Navigation(props) {

    return (
        <ul className={`tabs__nav`}>
            {props.tabs.map((item) => (
                <li key={item.id} className={`tabs__item`}>
                    <button className={`tabs__button ${(props.activeTabId === item.id) ? 'active' : ''}`}
                            onClick={() => props.onNavClick(item.id)}>
                        {item.name}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export function Tabs() {
    const [activeTabId, setActiveTab] = React.useState(tabs[0].id);

    const activeTab = React.useMemo(() => (
        tabs.find((tab) => (
            tab.id === activeTabId
        ))
    ), [activeTabId,tabs]);

    return (
        <div className={`tabs`}>
            <Navigation tabs={tabs} onNavClick={setActiveTab}
                        activeTabId={activeTabId}/>
            <Tab tab={activeTab}/>
        </div>
    );
}

