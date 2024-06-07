import { useContext } from "react";
import { utils } from "lib/utils";
import { theme } from "templates/theme";
import { TemplateContext } from "templates/components/TemplateContext";
import { Style } from "templates/types";

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
    ...rest
  } = props;
  const { isPdf, spacing } = useContext(TemplateContext);
  const style = {
    ...rest,
    ...(bottom && {
      bottom: isPdf ? bottom * spacing : utils.pt2px(bottom * spacing),
    }),
    ...(left && {
      left: isPdf ? left * spacing : utils.pt2px(left * spacing),
    }),
    ...(right && {
      right: isPdf ? right * spacing : utils.pt2px(right * spacing),
    }),
    ...(top && {
      top: isPdf ? top * spacing : utils.pt2px(top * spacing),
    }),
    ...(bgColor && {
      backgroundColor: bgColor,
    }),
    ...(margin && {
      margin: isPdf ? margin * spacing : utils.pt2px(margin * spacing),
    }),
    ...(mt && {
      marginTop: isPdf ? mt * spacing : utils.pt2px(mt * spacing),
    }),
    ...(mr && {
      marginRight: isPdf ? mr * spacing : utils.pt2px(mr * spacing),
    }),
    ...(mb && {
      marginBottom: isPdf ? mb * spacing : utils.pt2px(mb * spacing),
    }),
    ...(ml && {
      marginLeft: isPdf ? ml * spacing : utils.pt2px(ml * spacing),
    }),
    ...(padding && {
      padding: isPdf ? padding * spacing : utils.pt2px(padding * spacing),
    }),
    ...(pt && {
      paddingTop: isPdf ? pt * spacing : utils.pt2px(pt * spacing),
    }),
    ...(pr && {
      paddingRight: isPdf ? pr * spacing : utils.pt2px(pr * spacing),
    }),
    ...(pb && {
      paddingBottom: isPdf ? pb * spacing : utils.pt2px(pb * spacing),
    }),
    ...(pl && {
      paddingLeft: isPdf ? pl * spacing : utils.pt2px(pl * spacing),
    }),
    ...(fontSize && {
      fontSize: isPdf
        ? theme.fontSize[fontSize] * spacing
        : utils.pt2px(theme.fontSize[fontSize] * spacing),
    }),
    ...(letterSpacing && {
      letterSpacing: isPdf
        ? letterSpacing * spacing
        : utils.pt2px(letterSpacing * spacing),
    }),
    ...(borderBottomWidth && {
      borderBottomWidth: isPdf
        ? borderBottomWidth
        : utils.pt2px(borderBottomWidth),
    }),
  };
  return { style, isPdf, spacing };
}

export { useStyles };
