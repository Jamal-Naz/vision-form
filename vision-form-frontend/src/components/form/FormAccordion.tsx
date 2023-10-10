"use client";
import React, { useState } from "react";
import { Paper } from "@mui/material";
import { SectionOne, SectionOneFormErrors } from "@/components/form/SectionOne";
import {
  SectionThree,
  SectionThreeFormErrors,
} from "@/components/form/SectionThree";
import { SectionTwo, SectionTwoFormErrors } from "@/components/form/SectionTwo";
import axios from "axios";
import AlertSnackbar from "@/components/ui/AlertSnackbar";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

export interface FormErrors
  extends SectionOneFormErrors,
    SectionTwoFormErrors,
    SectionThreeFormErrors {}

const SECTIONS = ["section1", "section2", "section3"] as const;

export type SectionType = (typeof SECTIONS)[number] | null;

const FormAccordion: React.FC = () => {
  const [expanded, setExpanded] = useState<SectionType>("section1");

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [comments, setComments] = useState("");

  const [incompleteSections, setIncompleteSections] = useState<SectionType[]>(
    [],
  );
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    firstName: "",
    surname: "",
    telephone: "",
    gender: "",
    dob: "",
    comments: "",
  });

  const [open, setOpen] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "error" | "warning"
  >("success");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const updateIncompleteSections = (add: SectionType, remove: SectionType) => {
    setIncompleteSections((prevState) => {
      const newSections = prevState.filter((item) => item !== remove);
      if (add !== null) {
        newSections.push(add);
      }
      return newSections;
    });
  };

  const handleClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange =
    (panel: SectionType) =>
    (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : null);
    };
  const validateOne = (): {
    isValid: boolean;
    errors: SectionOneFormErrors;
  } => {
    const trimmedFirstName = firstName.trim();
    const trimmedSurname = surname.trim();
    const trimmedEmail = email.trim();

    let isValid = true;
    let tempErrors: SectionOneFormErrors = {
      firstName: "",
      surname: "",
      email: "",
    };

    if (!trimmedFirstName) {
      isValid = false;
      tempErrors.firstName = "First Name is required.";
    }

    if (!trimmedSurname) {
      isValid = false;
      tempErrors.surname = "Surname is required.";
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      isValid = false;
      tempErrors.email = "Invalid email address.";
    }

    if (isValid) {
      updateIncompleteSections(null, SECTIONS[0]);
    } else {
      updateIncompleteSections(SECTIONS[0], null);
    }

    return { isValid, errors: tempErrors };
  };

  const validateTwo = (): {
    isValid: boolean;
    errors: SectionTwoFormErrors;
  } => {
    let isValid = true;
    let tempErrors: SectionTwoFormErrors = {
      telephone: "",
      gender: "",
      dob: "",
    };

    const ukPhoneRegex = /^(?:\+44|0)?[\d\s-]{10,15}$/;
    if (!telephone.trim() || !ukPhoneRegex.test(telephone)) {
      isValid = false;
      tempErrors.telephone = "Please enter a valid phone number.";
    }

    if (!gender.trim()) {
      isValid = false;
      tempErrors.gender = "Gender is required.";
    }

    if (!dob.trim()) {
      isValid = false;
      tempErrors.dob = "Date of Birth is required.";
    }

    if (isValid) {
      updateIncompleteSections(null, SECTIONS[1]);
    } else {
      updateIncompleteSections(SECTIONS[1], null);
    }

    return { isValid, errors: tempErrors };
  };

  const validateThree = (): {
    isValid: boolean;
    errors: SectionThreeFormErrors;
  } => {
    let isValid = true;
    let tempErrors: SectionThreeFormErrors = {
      comments: "",
    };

    if (!comments.trim()) {
      isValid = false;
      tempErrors.comments = "Comments are required.";
    } else if (comments.trim().length > 500) {
      // assuming a maximum length of 500 characters for the comments
      isValid = false;
      tempErrors.comments = "Comments cannot exceed 500 characters.";
    }

    if (isValid) {
      updateIncompleteSections(null, SECTIONS[2]);
    } else {
      updateIncompleteSections(SECTIONS[2], null);
    }

    return { isValid, errors: tempErrors };
  };

  const validateAllSections = (): boolean => {
    let tempErrors: FormErrors = {
      firstName: "",
      surname: "",
      email: "",
      dob: "",
      gender: "",
      telephone: "",
      comments: "",
    };

    const validateOneResults = validateOne();
    const validateTwoResults = validateTwo();
    const validateThreeResults = validateThree();

    const newIncompleteSections: SectionType[] = [];
    if (!validateOneResults.isValid) newIncompleteSections.push("section1");
    if (!validateTwoResults.isValid) newIncompleteSections.push("section2");
    if (!validateThreeResults.isValid) newIncompleteSections.push("section3");
    setIncompleteSections(newIncompleteSections);

    tempErrors = {
      ...tempErrors,
      ...validateOneResults.errors,
      ...validateTwoResults.errors,
      ...validateThreeResults.errors,
    };
    setErrors(tempErrors);

    return (
      validateOneResults.isValid &&
      validateTwoResults.isValid &&
      validateThreeResults.isValid
    );
  };

  const handleSubmit = () => {
    if (validateAllSections()) {
      axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/users/register", {
          firstName,
          surname,
          email,
          telephone,
          gender,
          dob,
          comments,
        })
        .then(() => {
          setAlertMessage("Form data submitted successfully!");
          setAlertSeverity("success");
          setOpen(true);
        })
        .catch((error) => {
          const serverMessage =
            error.response && error.response.data && error.response.data.error;

          const errorMessage = serverMessage || "Error submitting form data.";

          setAlertMessage(errorMessage);
          setAlertSeverity("error");
          setOpen(true);
        });
    } else {
      setAlertMessage(
        "Please correct the errors in the form before submitting.",
      );
      setAlertSeverity("warning");
      setOpen(true);
    }
  };

  return (
    <Paper sx={{ width: 1 }}>
      <AlertSnackbar
        open={open}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleClose}
      />
      <SectionOne
        expanded={expanded}
        setExpanded={setExpanded}
        handleChange={handleChange}
        firstName={firstName}
        setFirstName={setFirstName}
        surname={surname}
        setSurname={setSurname}
        email={email}
        setEmail={setEmail}
        errors={errors}
        setErrors={setErrors}
        validate={validateOne}
        incompleteSections={incompleteSections}
      />
      <SectionTwo
        expanded={expanded}
        setExpanded={setExpanded}
        handleChange={handleChange}
        telephone={telephone}
        setTelephone={setTelephone}
        gender={gender}
        setGender={setGender}
        dob={dob}
        setDob={setDob}
        errors={errors}
        setErrors={setErrors}
        validate={validateTwo}
        incompleteSections={incompleteSections}
      />
      <SectionThree
        expanded={expanded}
        setExpanded={setExpanded}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        comments={comments}
        setComments={setComments}
        errors={errors}
        setErrors={setErrors}
        incompleteSections={incompleteSections}
      />
    </Paper>
  );
};

export default FormAccordion;
