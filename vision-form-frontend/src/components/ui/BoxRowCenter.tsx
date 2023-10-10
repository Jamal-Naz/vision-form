import { Box, BoxProps } from "@mui/material";

const BoxRowCenter = (props: BoxProps) => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    gap={2}
    {...props}
    sx={{ ...props.sx }}
  >
    {props.children}
  </Box>
);
export default BoxRowCenter;
