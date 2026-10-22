import type { Config, Info } from "../manager-api";

const cameras = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    type: "string",
    const: `${prefix}-${i + 1}`,
    title: `${prefix} Camera ${String(i + 1).padStart(3, "0")}`,
  }));

const videoStream = (prefix: string, count: number, extra = {}) => ({
  name: "video-stream",
  title: "Live video stream",
  mediaType: "video/mp2t",
  input: {
    type: "object",
    required: ["camera_id"],
    properties: {
      camera_id: {
        type: "string",
        title: "Camera",
        control: "combobox",
        oneOf: cameras(prefix, count),
      },
      ...extra,
    },
  },
});

const configs: Record<string, Config> = {
  alta: {
    id: "alta",
    module: "avigilon-alta-video",
    title: "Alta HQ",
    status: "online",
    statusReason: "",
  },
  unity: {
    id: "unity",
    module: "avigilon-unity-video",
    title: "Unity Warehouse",
    status: "online",
    statusReason: "",
  },
  watermark: {
    id: "watermark",
    module: "watermark",
    title: "Watermark",
    status: "online",
    statusReason: "",
  },
};

const configured = {
  alta: {
    name: "avigilon-alta-video",
    title: "Avigilon Alta Video",
    queries: [videoStream("Lobby", 12)],
  },
  unity: {
    name: "avigilon-unity-video",
    title: "Avigilon Unity Video",
    queries: [
      videoStream("Dock", 250, {
        quality: {
          type: "string",
          title: "Quality",
          enum: ["high", "low"],
          default: "high",
        },
      }),
      {
        name: "snapshot",
        title: "Snapshot",
        mediaType: "image/jpeg",
        input: { type: "object", properties: {} },
      },
    ],
  },
  watermark: {
    name: "watermark",
    title: "Watermark",
    queries: [
      {
        name: "watermark-video",
        title: "Watermark a video",
        mediaType: "video/mp2t",
        input: {
          type: "object",
          properties: {
            text: { type: "string", title: "Text" },
            source: {
              type: "object",
              title: "Source",
              control: "queryable",
              accept: "video/*",
            },
          },
        },
      },
    ],
  },
} as unknown as Record<string, Info>;

const routes: Record<string, unknown> = {
  "/api/config": configs,
  "/api/appinfo": [],
  "/api/appinfo/configured": configured,
};

const realFetch = globalThis.fetch;

globalThis.fetch = Object.assign(
  async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(
      input instanceof Request ? input.url : input,
      location.href,
    );
    const body = routes[url.pathname];
    return body === undefined ? realFetch(input, init) : Response.json(body);
  },
  realFetch,
);
