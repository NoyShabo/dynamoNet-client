import { Box, Typography } from "@mui/material";
// import ProgressCircle from "./progressCircle";
import '../../globalStyle.scss'
export function StatBox({ title, subtitle, progress, increase, icon }){

  return (
    <Box width="100%" m="0 30px" p="12px 0" overflow="hidden">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            
            sx={{ 
              color:"#fff", 
              fontFamily:"Source Sans Pro",
              // ellipsis when overflow:
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%"
              // display: "inline-block",
              // fontSize:"20px"

             }}
          >
            {title}
          </Typography>
        </Box>
        {/* <Box>
          <ProgressCircle progress={progress} />
        </Box> */}
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: "#4cceac", fontSize:"20px", fontFamily:"Source Sans Pro"  }}>
          {subtitle}
        </Typography>
        {/* <Typography
          variant="h5"
          fontStyle="italic"
          fontSize="18px" 
          sx={{ color: "#70d8bd"}}
        >
          {increase}
        </Typography> */}
      </Box>
    </Box>
  );
};

