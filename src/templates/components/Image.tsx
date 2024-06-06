import { Image as ReactPdfImage } from "@react-pdf/renderer";
import useStyles from "templates/useStyles";
import { Style } from "templates/types";
import utils from "lib/utils";

type Props = Style & {
  src: string;
  alt?: string;
};

function Image(props: Props) {
  const { src, alt = "", width, height, ...rest } = props;
  const { isPdf, spacing, style } = useStyles(rest);
  return isPdf ? (
    <ReactPdfImage
      src={src}
      style={{
        ...style,
        width: Number(width) * spacing,
        height: Number(height) * spacing,
      }}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{
        ...style,
        width: utils.pt2px(Number(width) * spacing),
        height: utils.pt2px(Number(height) * spacing),
      }}
    />
  );
}

export default Image;
