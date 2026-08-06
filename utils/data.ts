export function omitNulls(data: any): any {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([_, v]) => v !== null && typeof v !== "undefined",
    ),
  );
}
