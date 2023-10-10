import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import IncompleteFormMessage from "@/components/form/IncompleteFormMessage";
import BoxRowCenter from "@/components/ui/BoxRowCenter";
import CustomTextField from "@/components/ui/CustomTextField";
import { FormErrors, SectionType } from "@/components/form/FormAccordion";

export interface SectionThreeFormErrors {
  comments: string;
}

export const SectionThree: React.FC<{
  expanded: string | null;
  setExpanded: (section: SectionType) => void;
  handleChange: (
    panel: SectionType,
  ) => (_event: React.SyntheticEvent, newExpanded: boolean) => void;
  handleSubmit: () => void;
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
  errors: SectionThreeFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  incompleteSections: SectionType[];
}> = ({
  handleSubmit,
  expanded,
  setExpanded,
  handleChange,
  comments,
  setComments,
  errors,
  setErrors,
  incompleteSections,
}) => {
  const isIncomplete = incompleteSections.includes("section3");

  const characterLimit = 500;

  const handleSubmission = () => {
    handleSubmit();
  };

  return (
    <Accordion
      expanded={expanded === "section3"}
      onChange={handleChange("section3")}
    >
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="section3-content"
        id="section3-header"
      >
        <Typography
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          color={"#fff"}
        >
          Step 3: Final comments
        </Typography>
        <IncompleteFormMessage show={isIncomplete} />
      </AccordionSummary>
      <AccordionDetails>
        <BoxRowCenter alignItems={"flex-end"} justifyContent={"space-between"}>
          <CustomTextField
            label="Comments"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            helperText={
              errors.comments ||
              `${comments.length}/${characterLimit} characters`
            }
            inputProps={{ maxLength: characterLimit }}
            error={Boolean(errors.comments)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmission}
          >
            Next
          </Button>
        </BoxRowCenter>
      </AccordionDetails>
    </Accordion>
  );
};
