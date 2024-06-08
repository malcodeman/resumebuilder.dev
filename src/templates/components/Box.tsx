import { View as ReactPdfView } from "@react-pdf/renderer";
import { useStyles } from "templates/useStyles";
import { Style } from "templates/types";

type Props = Style & {
  children?: React.ReactNode;
};

function Box(props: Props) {
  const { children, ...rest } = props;
  const { isPdf, style } = useStyles(rest);
  return isPdf ? (
    <ReactPdfView style={style}>{children}</ReactPdfView>
  ) : (
    <div style={style}>{children}</div>
  );
}

export { Box };
