import  {FavoriteNodes} from "../../cmp/favoriteNodes/favoriteNodes";
import  {NodeGraphs} from "../../cmp/node-graphs/nodeGraphs";
import "./nodesMetrics.scss";
import project from "../../data/project.json";

export function NodesPage() {

    return (
        <div className="nodesPage">
            <div className='nodesPage-container'>
                <FavoriteNodes
                ></FavoriteNodes>
                <NodeGraphs  timeRanges={project.timeRanges} nodeName={'JoeBiden'}></NodeGraphs>
            </div>
        </div>
    );
}
