import "./mock";

import {
  Box,
  CssBaseline,
  GlobalStyles,
  Stack,
  Typography,
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
  ],
};

const Preview = () => {
  const [formData, setFormData] = useState<unknown>(initialFormData);

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
        <Typography variant="subtitle2">formData</Typography>
        {JSON.stringify(formData, null, 2)}
      </Box>
    </Stack>
  );
};

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <>
      <CssBaseline />
      <GlobalStyles styles={{ "html, body, #root": { height: "100%" } }} />
      <Preview />
    </>,
  );
}
