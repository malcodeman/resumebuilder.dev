import { Text as ReactPdfText } from "@react-pdf/renderer";
import useStyles from "templates/useStyles";
import { Style } from "templates/types";

type Props = Style & {
  children?: React.ReactNode;
};

function Text(props: Props) {
  const { children, ...rest } = props;
  const { isPdf, style } = useStyles(rest);
  return isPdf ? (
    <ReactPdfText style={style}>{children}</ReactPdfText>
  ) : (
    <p style={style}>{children}</p>
  );
}

export default Text;
