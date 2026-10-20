import "./mock";

import { DarkMode, LightMode } from "@mui/icons-material";
import {
  Box,
  createTheme,
  CssBaseline,
  GlobalStyles,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
  useColorScheme,
} from "@mui/material";
import type { RJSFSchema } from "@rjsf/utils";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { FabricJsonSchemaForm } from "../index";

const schema = {
  type: "object",
  properties: {
    cameras: {
      type: "array",
      title: "Cameras",
      description: "The cameras this plugin shows",
      control: "device-list",
      accept: "video/*",
      items: {
        type: "object",
        required: ["name", "query"],
        properties: {
          name: { type: "string", title: "Name", minLength: 1 },
          query: {
            type: "object",
            control: "queryable",
            accept: "video/*",
          },
          ptz: {
            type: "boolean",
            title: "PTZ controls",
            description: "Show pan, tilt and zoom controls for this camera",
            default: false,
          },
        },
      },
    },
  },
} as RJSFSchema;

const initialFormData = {
  cameras: [
    {
      name: "Alta HQ - Lobby Camera 001",
      query: {
        moduleId: "alta",
        name: "video-stream",
        input: { camera_id: "Lobby-1" },
      },
    },
    {
      name: "Removed camera",
      query: {
        moduleId: "alta",
        name: "video-stream",
        input: { camera_id: "gone" },
      },
    },
    {
      name: "Old NVR - Parking",
      query: {
        moduleId: "old-nvr",
        name: "video-stream",
        input: { camera_id: "parking" },
      },
    },
  ],
};

const theme = createTheme({ colorSchemes: { dark: true } });

const Preview = () => {
  const [formData, setFormData] = useState<unknown>(initialFormData);
  const { mode, systemMode, setMode } = useColorScheme();
  const dark = (mode === "system" ? systemMode : mode) === "dark";

  return (
    <Stack direction="row" gap={2} p={2} height="100%">
      <Box flex={1} minWidth={0} overflow="auto">
        <FabricJsonSchemaForm
          schema={schema}
          formData={formData}
          onChange={({ formData }) => setFormData(formData)}
        />
      </Box>
      <Box component="pre" flex={1} minWidth={0} m={0} overflow="auto">
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle2" flex={1}>
            formData
          </Typography>
          <IconButton
            aria-label={dark ? "Use light mode" : "Use dark mode"}
            onClick={() => setMode(dark ? "light" : "dark")}
          >
            {dark ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Stack>
        {JSON.stringify(formData, null, 2)}
      </Box>
    </Stack>
  );
};

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles
        styles={(theme) => ({
          "html, body, #root": { height: "100%" },
          "*": {
            scrollbarColor: `${theme.palette.action.disabled} transparent`,
          },
        })}
      />
      <Preview />
    </ThemeProvider>,
  );
}
