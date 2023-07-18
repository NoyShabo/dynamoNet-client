import { Box, Typography } from "@mui/material";
import "../../globalStyle.scss";
export function StatBox({ title, subtitle, icon }) {
  return (
    <Box width="100%" m="0 30px" p="12px 0" overflow="hidden">
      <Box display="flex" justifyContent="space-between">
        <Box className="overflow-ellipsis">
          {icon}
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              color: "#fff",
              fontFamily: "OpenSans-Light",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography
          variant="h5"
          sx={{
            color: "#4cceac",
            fontSize: "20px",
            fontFamily: "OpenSans-Light",
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
