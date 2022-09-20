type Flexbox = {
  alignContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch";
  flex?: number | string;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  //   flexFlow?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-around"
    | "space-between"
    | "space-evenly";
};
type Layout = {
  bottom?: number;
  display?: "flex" | "none";
  left?: number;
  position?: "absolute" | "relative";
  right?: number;
  top?: number;
  overflow?: "hidden";
  zIndex?: number;
};
type Dimension = {
  height?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  width?: number | string;
};
type Color = {
  bgColor?: string;
  color?: string;
  opacity?: number;
};
type Text = {
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  fontFamily?: string;
  fontStyle?: string | "normal";
  fontWeight?: number;
  letterSpacing?: number;
  lineHeight?: number | string;
  maxLines?: number;
  textAlign?: "left" | "right" | "center" | "justify";
  textDecoration?:
    | "line-through"
    | "underline"
    | "none"
    | "line-through underline"
    | "underline line-through";
  textDecorationColor?: string;
  textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | "wavy";
  textIndent?: number | string;
  textOverflow?: "ellipsis";
  textTransform?: "capitalize" | "lowercase" | "uppercase";
};

type Sizing = {
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: number | string;
  objectPositionX?: number | string;
  objectPositionY?: number | string;
};
type Margin = {
  margin?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  padding?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
};
type Transformations = {
  transform?: string;
  transformOrigin?: number | string;
  transformOriginX?: number | string;
  transformOriginY?: number | string;
};
type Borders = {
  border?: number | string;
  borderWidth?: number | string;
  borderColor?: string;
  borderStyle?: "dashed" | "dotted" | "solid";
  borderTop?: number | string;
  borderTopColor?: string;
  borderTopStyle?: "dashed" | "dotted" | "solid";
  borderTopWidth?: number | string;
  borderRight?: number | string;
  borderRightColor?: string;
  borderRightStyle?: "dashed" | "dotted" | "solid";
  borderRightWidth?: number | string;
  borderBottom?: number | string;
  borderBottomColor?: string;
  borderBottomStyle?: "dashed" | "dotted" | "solid";
  borderBottomWidth?: number | string;
  borderLeft?: number | string;
  borderLeftColor?: string;
  borderLeftStyle?: "dashed" | "dotted" | "solid";
  borderLeftWidth?: number | string;
  borderTopLeftRadius?: number | string;
  borderTopRightRadius?: number | string;
  borderBottomRightRadius?: number | string;
  borderBottomLeftRadius?: number | string;
  borderRadius?: number | string;
};
type Style = Flexbox &
  Layout &
  Dimension &
  Color &
  Text &
  Sizing &
  Margin &
  Transformations &
  Borders;

export type { Style };
