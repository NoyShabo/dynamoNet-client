import { GraphComponent } from '../../cmp/network-graph-vis/networkGraphVis'
import { PieChart } from '../../cmp/pie/pie'
import './timerange.scss'

export function Timerange(){

    const retweetsQuote ={
        retweets:32000,
        quotes:52220,
        // timeRange_3:125,
    }

    return(
        <div className='timerange'>
            <h2 className='title'>Before election</h2>
            <GraphComponent />
            <div className='container-chart'>
                <PieChart width={300} height={300} dataObject={retweetsQuote}/>
                <PieChart width={300} height={300} dataObject={retweetsQuote}/>
            </div>
        </div>
    )
}