import { Text, Link as ReactPdfLink } from "@react-pdf/renderer";
import { or } from "ramda";
import useStyles from "templates/useStyles";
import { Style } from "templates/types";

type props = Style & {
  href: string;
  children?: React.ReactNode;
};

function Link(props: props) {
  const { href, color, children, ...rest } = props;
  const { isPdf, style } = useStyles(rest);
  const localStyle = {
    color: or(color, "#00A1F1"),
    textDecoration: "none" as const,
    ...style,
  };
  return isPdf ? (
    <ReactPdfLink src={href} style={localStyle}>
      <Text>{children}</Text>
    </ReactPdfLink>
  ) : (
    <a href={href} style={localStyle}>
      {children}
    </a>
  );
}

export default Link;
