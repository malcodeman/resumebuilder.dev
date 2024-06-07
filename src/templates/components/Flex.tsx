import { View as ReactPdfView } from "@react-pdf/renderer";
import { useStyles } from "templates/useStyles";
import { Style } from "templates/types";

type Props = Style & {
  children?: React.ReactNode;
};

function Flex(props: Props) {
  const { children, ...rest } = props;
  const { isPdf, style } = useStyles(rest);
  const localStyle = {
    display: "flex" as const,
    flexDirection: "row" as const,
    ...style,
  };
  return isPdf ? (
    <ReactPdfView style={localStyle}>{children}</ReactPdfView>
  ) : (
    <div style={localStyle}>{children}</div>
  );
}

export { Flex };
