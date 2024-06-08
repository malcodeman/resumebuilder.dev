import { createContext } from "react";

const TemplateContext = createContext({
  isPdf: false,
  isDescendantOfLink: false,
  spacing: 1,
});

export { TemplateContext };
