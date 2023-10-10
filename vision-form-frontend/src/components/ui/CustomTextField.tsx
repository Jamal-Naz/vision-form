import React from "react";
import Typography from "@mui/material/Typography";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface CustomTextFieldProps extends Omit<TextFieldProps, "label"> {
  label?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  ...props
}) => {
  return (
    <Box gap={0}>
      {label && (
        <Typography variant="body1" fontWeight={600}>
          {label}
        </Typography>
      )}
      <TextField {...props} />
    </Box>
  );
};

export default CustomTextField;
