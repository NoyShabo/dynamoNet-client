import React from "react";
import { NetworkMetrics } from "../../../cmp/network-metrics/networkMetrics";

export function SourceNetwork({ network }) {
  return (
    <div className="source-network">
      <div className="title-project">Source Network</div>
      {network && <NetworkMetrics network={network} />}
    </div>
  );
}
