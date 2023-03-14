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

//   const handleChange = (event, newValue="3") => {
//     console.log(event);
//     setValue("2");
//   };

//   return (
//     <Box sx={{ width: '100%', typography: 'body1' }}>
//       <TabContext value={value.toString()}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <TabList onChange={handleChange} aria-label="lab API tabs example">
//           { tabs.map(tab=>{
//             return (
//               <Tab label={tab.name} value={tab.id.toString()}  tabIndex={tab.id} key={tab.id+'aa'} className={`tabs__item`}/> )
//           })
//          }
//           </TabList>
//         </Box>
//         {
//           tabs.map(tab=>{
//             return (
//               <TabPanel value={tab.id.toString()} key={tab.id+"bb"}>{tab.component}</TabPanel>
//               )
//           })
//         }
//         {/* <TabPanel value="1">Item One</TabPanel>
//         <TabPanel value="2">Item Two</TabPanel>
//         <TabPanel value="3">Item Three</TabPanel>
//         <TabPanel value="4">Item Four</TabPanel> */}
//       </TabContext>
//     </Box>
//   );
// }


