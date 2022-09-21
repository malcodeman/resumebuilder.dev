import { useContext } from "react";
import { or } from "ramda";

import utils from "../lib/utils";
import theme from "./theme";

import TemplateContext from "./components/TemplateContext";

import { Style } from "./types";

function useStyles(props: Style) {
  const {
    bottom,
    left,
    right,
    top,
    bgColor,
    margin,
    mt,
    mr,
    mb,
    ml,
    padding,
    pt,
    pr,
    pb,
    pl,
    fontSize,
    letterSpacing,
    borderBottomWidth,
  } = props;
  const { isPdf, spacing } = useContext(TemplateContext);
  const style = {
    ...props,
    bottom: or(isPdf ? bottom * spacing : utils.pt2px(bottom * spacing), null),
    left: or(isPdf ? left * spacing : utils.pt2px(left * spacing), null),
    right: or(isPdf ? right * spacing : utils.pt2px(right * spacing), null),
    top: or(isPdf ? top * spacing : utils.pt2px(top * spacing), null),
    backgroundColor: bgColor,
    margin: or(isPdf ? margin * spacing : utils.pt2px(margin * spacing), null),
    marginTop: or(isPdf ? mt * spacing : utils.pt2px(mt * spacing), null),
    marginRight: or(isPdf ? mr * spacing : utils.pt2px(mr * spacing), null),
    marginBottom: or(isPdf ? mb * spacing : utils.pt2px(mb * spacing), null),
    marginLeft: or(isPdf ? ml * spacing : utils.pt2px(ml * spacing), null),
    padding: or(
      isPdf ? padding * spacing : utils.pt2px(padding * spacing),
      null
    ),
    paddingTop: or(isPdf ? pt * spacing : utils.pt2px(pt * spacing), null),
    paddingRight: or(isPdf ? pr * spacing : utils.pt2px(pr * spacing), null),
    paddingBottom: or(isPdf ? pb * spacing : utils.pt2px(pb * spacing), null),
    paddingLeft: or(isPdf ? pl * spacing : utils.pt2px(pl * spacing), null),
    fontSize: or(
      isPdf
        ? theme.fontSize[fontSize] * spacing
        : utils.pt2px(theme.fontSize[fontSize] * spacing),
      null
    ),
    letterSpacing: or(letterSpacing * spacing, null),
    borderBottomWidth: or(
      isPdf ? borderBottomWidth : utils.pt2px(borderBottomWidth),
      null
    ),
  };
  return { style, isPdf, spacing };
}

export default useStyles;
