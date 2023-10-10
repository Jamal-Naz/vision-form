import { Box, BoxProps } from "@mui/material";

const BoxColumnCenter = (props: BoxProps) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap={2}
    {...props}
    sx={{ ...props.sx }}
  >
    {props.children}
  </Box>
);
export default BoxColumnCenter;
