import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import IncompleteFormMessage from "@/components/form/IncompleteFormMessage";
import BoxColumnCenter from "@/components/ui/BoxColumnCenter";
import BoxRowCenter from "@/components/ui/BoxRowCenter";
import CustomTextField from "@/components/ui/CustomTextField";
import { FormErrors, SectionType } from "@/components/form/FormAccordion";

export interface SectionTwoFormErrors {
  telephone: string;
  gender: string;
  dob: string;
}

export const SectionTwo: React.FC<{
  expanded: string | null;
  setExpanded: (section: SectionType) => void;
  handleChange: (
    panel: SectionType,
  ) => (_event: React.SyntheticEvent, newExpanded: boolean) => void;
  telephone: string;
  setTelephone: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  dob: string;
  setDob: React.Dispatch<React.SetStateAction<string>>;
  errors: SectionTwoFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  validate: () => {
    isValid: boolean;
    errors: SectionTwoFormErrors;
  };
  incompleteSections: SectionType[];
}> = ({
  expanded,
  setExpanded,
  handleChange,
  telephone,
  setTelephone,
  gender,
  setGender,
  dob,
  setDob,
  errors,
  setErrors,
  validate,
  incompleteSections,
}) => {
  const isIncomplete = incompleteSections.includes("section2");

  const handleNext = () => {
    const { errors, isValid } = validate();
    setErrors((prevState) => ({ ...prevState, ...errors }));
    if (isValid) {
      setExpanded("section3");
    }
  };

  return (
    <Accordion
      expanded={expanded === "section2"}
      onChange={handleChange("section2")}
    >
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="section2-content"
        id="section2-header"
      >
        <Typography
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          color={"#fff"}
        >
          Step 2: More comments
        </Typography>
        <IncompleteFormMessage show={isIncomplete} />
      </AccordionSummary>
      <AccordionDetails>
        <BoxColumnCenter alignItems={"flex-start"}>
          <BoxRowCenter justifyContent={"flex-start"} alignItems={"flex-end"}>
            <CustomTextField
              label="Telephone Number"
              variant="outlined"
              margin="normal"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              helperText={errors.telephone}
              error={!!errors.telephone}
            />
            <FormControl
              variant="outlined"
              margin="normal"
              error={!!errors.gender}
              sx={{ flexGrow: 0.25 }}
            >
              <Typography variant="body1" fontWeight={600}>
                Gender
              </Typography>
              {/*<InputLabel>Select Gender</InputLabel>*/}
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value as string)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.gender && (
                <div style={{ color: "red", marginTop: "8px" }}>
                  {errors.gender}
                </div>
              )}
            </FormControl>
          </BoxRowCenter>
          <CustomTextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            margin="normal"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            InputLabelProps={{ shrink: true }}
            helperText={errors.dob}
            error={!!errors.dob}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ alignSelf: "flex-end" }}
          >
            Next
          </Button>
        </BoxColumnCenter>
      </AccordionDetails>
    </Accordion>
  );
};
