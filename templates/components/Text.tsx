import { Text as ReactPdfText } from "@react-pdf/renderer";

import useStyles from "../useStyles";

import { Style } from "../types";

type props = Style & {
  children?: React.ReactNode;
};

function Text(props: props) {
  const { children, ...rest } = props;
  const { isPdf, style } = useStyles(rest);
  return isPdf ? (
    <ReactPdfText style={style}>{children}</ReactPdfText>
  ) : (
    <p style={style}>{children}</p>
  );
}

export default Text;
