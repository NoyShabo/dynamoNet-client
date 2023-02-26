import './App.css';
import LineChart from './cmp/line-chart/line-chart';
import { MyGraph } from './cmp/network-graph/networkGraph';
import { MultiGraph } from './cmp/network-graph/networkGraph';
import { FormNewProject } from './pages/form-new-project/form';
import { LoginPage } from './pages/login-signup/loginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import {DisplayGraph} from './cmp/adi/adi'

function App() {
  return (
    <BrowserRouter>

    <div className="App">
     {/* <LoginPage /> */}
     {/* <FormNewProject /> */}
     {/* <MyGraph /> */}
     {/* <MultiGraph /> */}
     <Routes >
      <Route path='/' element ={<MyGraph />} />
      <Route path='/chart' element ={<LineChart />}/>

     </Routes>
     {/* <LineChart/> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
