import { View as ReactPdfView } from "@react-pdf/renderer";

import useStyles from "../useStyles";

import { Style } from "../types";

type props = Style & {
  children?: React.ReactNode;
};

function Box(props: props) {
  const { children, ...rest } = props;
  const { isPdf, style } = useStyles(rest);
  return isPdf ? (
    <ReactPdfView style={style}>{children}</ReactPdfView>
  ) : (
    <div style={style}>{children}</div>
  );
}

export default Box;
