import "./mock";

import { Box, CssBaseline, Stack, Typography } from "@mui/material";
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
    <Stack direction="row" gap={2} p={2} alignItems="flex-start">
      <Box flex={1} minWidth={0}>
        <FabricJsonSchemaForm
          schema={schema}
          formData={formData}
          onChange={({ formData }) => setFormData(formData)}
        />
      </Box>
      <Box
        component="pre"
        flex={1}
        minWidth={0}
        m={0}
        position="sticky"
        top={16}
        maxHeight="calc(100vh - 32px)"
        overflow="auto"
      >
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
      <Preview />
    </>,
  );
}
