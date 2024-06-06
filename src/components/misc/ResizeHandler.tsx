import { useMediaQuery } from "@react-hookz/web";
import {
  motion,
  MotionStyle,
  useMotionValue,
  useTransform,
} from "framer-motion";

type Props = {
  children: React.ReactNode;
} & MotionStyle;

const DEFAULT_WIDTH = 340;

function ResizeHandler(props: Props) {
  const { children, ...rest } = props;
  const x = useMotionValue(DEFAULT_WIDTH);
  const width = useTransform(x, (x) => `${x}px`);
  const isLargeDevice = useMediaQuery("(min-width: 62em)", {
    initializeWithValue: false,
  });

  return isLargeDevice ? (
    <>
      <motion.div style={{ ...rest, width }}>{children}</motion.div>
      <motion.div
        drag="x"
        dragConstraints={{
          left: DEFAULT_WIDTH,
          right: DEFAULT_WIDTH + 140,
        }}
        style={{
          x,
          width: "6px",
          height: "100%",
          position: "fixed",
          cursor: "ew-resize",
          top: 0,
        }}
        onDoubleClick={() => x.set(DEFAULT_WIDTH)}
      />
    </>
  ) : (
    <>{children}</>
  );
}

export default ResizeHandler;
