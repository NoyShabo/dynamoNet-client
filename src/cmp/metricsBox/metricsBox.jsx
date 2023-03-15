import CommitIcon from "@mui/icons-material/Commit";
import GrainIcon from "@mui/icons-material/Grain";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import ShareIcon from "@mui/icons-material/Share";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { StatBox } from "../startBox/startBox";

export function MetricsBox({
  numberOfNodes,
  numberOfEdges,
  density,
  diameter,
  radius,
  reciprocity,
  degreeCentrality,
}) {
  return (
    <Box m="20px">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            height="160px"
            backgroundColor={"#1F2A40"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 1px 4px 0px #9f9797"
            borderRadius="10px"
          >
            <StatBox
              title={numberOfNodes}
              subtitle="Nodes"
              progress="0.75"
              increase="+14%"
              icon={
                <ScatterPlotIcon sx={{ color: "#3da58a", fontSize: "26px" }} />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            height="160px"
            backgroundColor={"#1F2A40"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 1px 4px 0px #9f9797"
            borderRadius="10px"
          >
            <StatBox
              title={numberOfEdges}
              subtitle="Edges"
              progress="0.50"
              increase="+21%"
              icon={<ShareIcon sx={{ color: "#70d8bd", fontSize: "26px" }} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            height="160px"
            backgroundColor="#1F2A40"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 1px 4px 0px #9f9797"
            borderRadius="10px"
          >
            <StatBox
              title={density || "NaN"}
              subtitle="Density"
              progress="0.30"
              increase="+5%"
              icon={<GrainIcon sx={{ color: "#70d8bd", fontSize: "26px" }} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            height="160px"
            backgroundColor="#1F2A40"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 1px 4px 0px #9f9797"
            borderRadius="10px"
          >
            <StatBox
              title={diameter || "NaN"}
              subtitle="Diameter"
              progress="0.80"
              increase="+43%"
              icon={<ShareIcon sx={{ color: "#70d8bd", fontSize: "26px" }} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            height="160px"
            backgroundColor="#1F2A40"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 1px 4px 0px #9f9797"
            borderRadius="10px"
          >
            <StatBox
              title={radius || "NaN"}
              subtitle="Radius"
              progress="0.80"
              increase="+43%"
              icon={<ShareIcon sx={{ color: "#70d8bd", fontSize: "26px" }} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            height="160px"
            backgroundColor="#1F2A40"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 1px 4px 0px #9f9797"
            borderRadius="10px"
          >
            <StatBox
              title={reciprocity || "NaN"}
              subtitle="Reciprocity"
              progress="0.80"
              increase="+43%"
              icon={
                <HandshakeIcon sx={{ color: "#70d8bd", fontSize: "26px" }} />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            height="160px"
            backgroundColor="#1F2A40"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 1px 4px 0px #9f9797"
            borderRadius="10px"
          >
            <StatBox
              title={degreeCentrality || "NaN"}
              subtitle="Degree Centralization"
              progress="0.80"
              increase="+43%"
              icon={<CommitIcon sx={{ color: "#70d8bd", fontSize: "26px" }} />}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
