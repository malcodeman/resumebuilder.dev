import { Document, Page as ReactPdfPage } from "@react-pdf/renderer";
import { PageSize } from "@react-pdf/types";

import useStyles from "../useStyles";

import utils from "../../lib/utils";
import theme from "../theme";

import { Template } from "../../types";
import { Style } from "../types";

type props = Style & {
  id: Template;
  size?: PageSize;
  children: React.ReactNode;
};

function Page(props: props) {
  const { id, size = "A4", children } = props;
  const { isPdf, spacing, style } = useStyles(props);
  const localStyle = {
    ...style,
    width: "100%",
    lineHeight: 1,
    color: "#222",
    height: "100%",
    backgroundColor: "#FFF",
    position: "relative" as const,
    fontFamily: isPdf ? "Roboto" : `'Roboto', sans-serif`,
    fontSize: isPdf
      ? theme.fontSize.xs
      : utils.pt2px(theme.fontSize.xs * spacing),
  };
  return isPdf ? (
    <Document>
      <ReactPdfPage size={size} style={localStyle}>
        {children}
      </ReactPdfPage>
    </Document>
  ) : (
    <div id={id} style={localStyle}>
      {children}
    </div>
  );
}

export default Page;
