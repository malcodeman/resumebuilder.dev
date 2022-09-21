import { Document, Font, Page as ReactPdfPage } from "@react-pdf/renderer";
import { PageSize } from "@react-pdf/types";

import useStyles from "../useStyles";

import utils from "../../lib/utils";
import theme from "../theme";

import { Template } from "../../types";
import { Style } from "../types";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Me5Q.ttf" },
    {
      src: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlvAw.ttf",
      fontWeight: 700,
    },
  ],
});

type props = Style & {
  id: Template;
  size?: PageSize;
  children: React.ReactNode;
};

function Page(props: props) {
  const { id, size = "A4", children, ...rest } = props;
  const { isPdf, spacing, style } = useStyles(rest);
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
