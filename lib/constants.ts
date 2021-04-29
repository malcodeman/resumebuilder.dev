import { Template } from "../types";

const IS_PROD = process.env.NODE_ENV === "production";
const TEMPLATES: Template[] = Object.values(Template);

export { IS_PROD, TEMPLATES };
