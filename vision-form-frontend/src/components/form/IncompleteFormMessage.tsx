import React from "react";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

const IncompleteFormMessage = ({ show }: { show: boolean }) => {
  const theme = useTheme();

  if (!show) {
    return null;
  }

  return (
    <Typography sx={{ pl: 2 }} color={theme.palette.error.main}>
      (incomplete)
    </Typography>
  );
};

export default IncompleteFormMessage;
