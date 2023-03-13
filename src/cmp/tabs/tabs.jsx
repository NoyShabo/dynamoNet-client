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


// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import { useSetState } from 'react-use';

// export function Tabs({tabs}) {
//   const [value, setValue] = useSetState("1");

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%', typography: 'body1' }}>
//       <TabContext value={value}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <TabList onChange={handleChange} aria-label="lab API tabs example">
//             <Tab label="Item One" value="1" />
//             <Tab label="Item Two" value="2" />
//             <Tab label="Item Three" value="3" />
//             <Tab label="Item Four" value="4" />
//           </TabList>
//         </Box>
//         <TabPanel value="1">Item One</TabPanel>
//         <TabPanel value="2">Item Two</TabPanel>
//         <TabPanel value="3">Item Three</TabPanel>
//         <TabPanel value="4">Item Four</TabPanel>
//       </TabContext>
//     </Box>
//   );
// }