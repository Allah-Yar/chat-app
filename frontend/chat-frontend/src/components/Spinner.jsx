import { CircularProgress, Box } from "@mui/material";

const Spinner = () => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
    <CircularProgress />
  </Box>
);

export default Spinner;
