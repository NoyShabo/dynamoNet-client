import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { BarChart } from './cmp/bar-chart/bar-chart';
import { AreaChart } from './cmp/line-chart/line-chart';
import {GraphComponent} from "./cmp/network-graph-vis/networkGraphVis";
import { PieChart } from './cmp/pie/pie';
import { FormNewProject } from './pages/form-new-project/form';
import { LoginPage } from './pages/login-signup/loginSignup';
import { Timerange } from './pages/timerange/timerange';


function App() {
  
  return (
    <BrowserRouter>

    <div className="App">

     <Routes >
      <Route path='/' element ={<LoginPage />} />
      <Route path='/addProject' element ={<FormNewProject />} />
      <Route path='/barChart' element ={<BarChart width={700} height={500}/>} />
      <Route path='/pieChart' element ={<PieChart width={700} height={500} />} />
      <Route path='/chart' element ={<AreaChart width={600} height={600} dataArray={appleStock}/>}/>
      <Route path='/networkGraph' element ={<GraphComponent />} />
      <Route path='/timeRange' element ={<Timerange />} />
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
