import { Roboto } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

let theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#655bb4" },
    secondary: { main: "#fdc300" },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: "4px 36px",
          background: "linear-gradient(180deg, #444cb1 30%, #9488d7 90%)",
          textTransform: "none",
        },
        contained: {
          "&:hover": {
            background: "linear-gradient(180deg, #444cb1 50%, #9488d7 100%)",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "8px 14px",
        },
        root: {
          boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.5)",
          backgroundColor: "#fff",
          borderRadius: 8,
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "none",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            boxShadow: "none",
            margin: "8px 0",
          },
        },
      },
    },
    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: null,
      },
      styleOverrides: {
        root: {
          background: "linear-gradient(180deg, #fec501, #eea50c)",
          borderRadius: 8,
          margin: 4,
          border: "none",
          "&$expanded": {
            minHeight: "initial",
          },
        },
        content: {
          "&$expanded": {
            margin: "initial",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: "#dedede",
          border: "none",
          marginLeft: 4,
          marginRight: 4,
          borderRadius: 8,
          marginBottom: 4,
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
