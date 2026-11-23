export function omitNulls(data: any): any {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([_, v]) => v !== null && typeof v !== "undefined",
    ),
  );
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const removeEmpty = <T extends Record<string, unknown>>(obj: T): T => {
  const newObj = {} as T;
  for (const key in obj) {
    const value = obj[key];
    if (value !== undefined && value !== null) {
      if (isObject(value)) {
        const cleaned = removeEmpty(value);
        if (Object.keys(cleaned).length > 0) {
          newObj[key] = cleaned;
        }
      } else {
        newObj[key] = value;
      }
    }
  }
  return newObj;
};
