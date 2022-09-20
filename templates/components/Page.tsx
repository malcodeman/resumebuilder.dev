import { useContext } from "react";
import { Document, Page as ReactPdfPage } from "@react-pdf/renderer";
import { PageSize } from "@react-pdf/types";

import utils from "../../lib/utils";
import theme from "../theme";

import TemplateContext from "./TemplateContext";

import { Template } from "../../types";

type props = {
  id: Template;
  size?: PageSize;
  children: React.ReactNode;
};

function Page(props: props) {
  const { id, size = "A4", children } = props;
  const { isPdf, spacing } = useContext(TemplateContext);
  const style = {
    width: "100%",
    lineHeight: 1,
    height: "100%",
    color: "#222",
    backgroundColor: "#FFF",
    position: "relative" as const,
    fontFamily: isPdf ? "Roboto" : `'Roboto', sans-serif`,
    fontSize: isPdf
      ? theme.fontSize.xs
      : utils.pt2px(theme.fontSize.xs * spacing),
    paddingTop: isPdf ? 40 * spacing : utils.pt2px(40 * spacing),
    paddingLeft: isPdf ? 80 * spacing : utils.pt2px(80 * spacing),
    paddingRight: isPdf ? 80 * spacing : utils.pt2px(80 * spacing),
    paddingBottom: isPdf ? 40 * spacing : utils.pt2px(40 * spacing),
  };
  return isPdf ? (
    <Document>
      <ReactPdfPage size={size} style={style}>
        {children}
      </ReactPdfPage>
    </Document>
  ) : (
    <div style={style} id={id}>
      {children}
    </div>
  );
}

export default Page;
