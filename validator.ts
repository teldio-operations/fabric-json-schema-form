import { customizeValidator } from "@rjsf/validator-ajv8";
import Ajv2020 from "ajv/dist/2020";

export const validator = customizeValidator({
  AjvClass: Ajv2020,
  ajvOptionsOverrides: {},
});
