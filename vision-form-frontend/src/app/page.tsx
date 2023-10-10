import * as React from "react";
import Box from "@mui/material/Box";
import FormAccordion from "@/components/form/FormAccordion";
import BoxColumnCenter from "@/components/ui/BoxColumnCenter";

export default function HomePage() {
  return (
    <BoxColumnCenter width={1} maxWidth={"md"} height={"100vh"}>
      <FormAccordion />
    </BoxColumnCenter>
  );
}
