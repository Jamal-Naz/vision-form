import React, { SyntheticEvent } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";

interface AlertSnackbarProps {
  open: boolean;
  message: string;
  severity: AlertProps["severity"];
  onClose: (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason,
  ) => void;
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
