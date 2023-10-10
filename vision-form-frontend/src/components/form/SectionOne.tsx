import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import IncompleteFormMessage from "@/components/form/IncompleteFormMessage";
import BoxColumnCenter from "@/components/ui/BoxColumnCenter";
import BoxRowCenter from "@/components/ui/BoxRowCenter";
import CustomTextField from "@/components/ui/CustomTextField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FormErrors, SectionType } from "@/components/form/FormAccordion";

export interface SectionOneFormErrors {
  firstName: string;
  surname: string;
  email: string;
}

export const SectionOne: React.FC<{
  expanded: string | null;
  setExpanded: (section: SectionType) => void;
  handleChange: (
    panel: SectionType,
  ) => (_event: React.SyntheticEvent, newExpanded: boolean) => void;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  surname: string;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errors: SectionOneFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  validate: () => {
    isValid: boolean;
    errors: SectionOneFormErrors;
  };
  incompleteSections: SectionType[];
}> = ({
  expanded,
  setExpanded,
  handleChange,
  firstName,
  setFirstName,
  surname,
  setSurname,
  email,
  setEmail,
  errors,
  setErrors,
  validate,
  incompleteSections,
}) => {
  const theme = useTheme();

  const isIncomplete = incompleteSections.includes("section1");

  const handleNext = () => {
    const { errors, isValid } = validate();
    setErrors((prevState) => ({ ...prevState, ...errors }));
    if (isValid) {
      setExpanded("section2");
    }
  };

  return (
    <Accordion
      expanded={expanded === "section1"}
      onChange={handleChange("section1")}
      sx={{ marginBottom: theme.spacing(0) }}
    >
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="section1-content"
        id="section1-header"
      >
        <Typography
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          color={"#fff"}
        >
          Step 1: Your details
        </Typography>
        <IncompleteFormMessage show={isIncomplete} />
      </AccordionSummary>
      <AccordionDetails>
        <BoxColumnCenter alignItems={"flex-start"} gap={0}>
          <BoxRowCenter justifyContent={"flex-start"}>
            <CustomTextField
              label="First Name"
              variant="outlined"
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              helperText={errors.firstName}
              error={!!errors.firstName}
              fullWidth
            />

            <CustomTextField
              label="Surname"
              variant="outlined"
              margin="normal"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              helperText={errors.surname}
              error={!!errors.surname}
            />
          </BoxRowCenter>
          <CustomTextField
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors.email}
            error={!!errors.email}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ alignSelf: "flex-end" }}
            endIcon={<ArrowForwardIosIcon />}
          >
            Next
          </Button>
        </BoxColumnCenter>
      </AccordionDetails>
    </Accordion>
  );
};
