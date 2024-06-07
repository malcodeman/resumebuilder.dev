import { Text, Link as ReactPdfLink } from "@react-pdf/renderer";
import { or } from "ramda";
import { useContext } from "react";
import { useStyles } from "templates/useStyles";
import { Style } from "templates/types";
import { TemplateContext } from "templates/components/TemplateContext";

type Props = Style & {
  href: string;
  children?: React.ReactNode;
};

function Link(props: Props) {
  const { href, color, children, ...rest } = props;
  const { isPdf, style } = useStyles(rest);
  const { isDescendantOfLink } = useContext(TemplateContext);
  const localStyle = {
    color: or(color, "#00A1F1"),
    textDecoration: "none" as const,
    ...style,
  };

  if (isPdf) {
    return (
      <ReactPdfLink src={href} style={localStyle}>
        <Text>{children}</Text>
      </ReactPdfLink>
    );
  }

  return isDescendantOfLink ? (
    <span style={localStyle}>{children}</span>
  ) : (
    <a href={href} style={localStyle}>
      {children}
    </a>
  );
}

export { Link };
