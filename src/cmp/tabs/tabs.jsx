import React from "react";
import "./tabs.scss";

function Tab(props) {
  return <>{props.tab.component}</>;
}

function Navigation(props) {
  return (
    <ul className={`tabs__nav`}>
      {props.tabs.map((item) => (
        <li key={item.id} className={`tabs__item`}>
          <button
            className={`tabs__button ${
              props.activeTabId === item.id ? "active" : ""
            }`}
            onClick={() => props.onNavClick(item.id)}
          >
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function Tabs({ tabs }) {
  const [activeTabId, setActiveTab] = React.useState(tabs[0].id);

  const activeTab = React.useMemo(
    () => tabs.find((tab) => tab.id === activeTabId),
    [activeTabId, tabs]
  );

  return (
    <div className={`tabs`}>
      <Navigation
        tabs={tabs}
        onNavClick={setActiveTab}
        activeTabId={activeTabId}
      />
      <Tab tab={activeTab} />
    </div>
  );
}
