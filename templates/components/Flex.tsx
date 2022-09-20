import { View as ReactPdfView } from "@react-pdf/renderer";

import useStyles from "../useStyles";

import { Style } from "../types";

type props = Style & {
  children?: React.ReactNode;
};

function Flex(props: props) {
  const { children } = props;
  const { isPdf, style } = useStyles(props);
  const localStyle = {
    display: "flex" as const,
    ...style,
  };
  return isPdf ? (
    <ReactPdfView style={localStyle}>{children}</ReactPdfView>
  ) : (
    <div style={localStyle}>{children}</div>
  );
}

export default Flex;
