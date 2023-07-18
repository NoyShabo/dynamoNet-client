import { Tabs } from "@mantine/core";
import React, { useState } from "react";
import "./tabs.scss";

export function MyTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <Tabs
      defaultValue="source_network"
      variant="outline"
      color="teal"
      className="tabs__navigate"
    >
      <Tabs.List className="tab_list">
        <Tabs.Tab
          className={`tab_h ${activeTab === 0 ? " active" : ""}`}
          value="source_network"
          onClick={() => {
            setActiveTab(0);
          }}
        >
          <h3>Source Network</h3>
        </Tabs.Tab>
        <Tabs.Tab
          className={`tab_h ${activeTab === 1 ? " active" : ""}`}
          value="network_evolution"
          onClick={() => {
            setActiveTab(1);
          }}
        >
          <h3>Network Evolution</h3>
        </Tabs.Tab>
        <Tabs.Tab
          className={`tab_h ${activeTab === 2 ? " active" : ""}`}
          value="node_evolution"
          onClick={() => {
            setActiveTab(2);
          }}
        >
          <h3>Node Evolution</h3>
        </Tabs.Tab>
        <Tabs.Tab
          className={`tab_h ${activeTab === 3 ? " active" : ""}`}
          value="community_evolution"
          onClick={() => {
            setActiveTab(3);
          }}
        >
          <h3>Community Evolution</h3>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="source_network" pt="xs">
        {tabs[0].component}
      </Tabs.Panel>

      <Tabs.Panel value="network_evolution" pt="xs">
        {activeTab === 1 && tabs[1].component}
      </Tabs.Panel>

      <Tabs.Panel value="node_evolution" pt="xs">
        {tabs[2].component}
      </Tabs.Panel>

      <Tabs.Panel value="community_evolution" pt="xs">
        {tabs[3].component}
      </Tabs.Panel>
    </Tabs>
  );
}
