import {
  motion,
  MotionStyle,
  useMotionValue,
  useTransform,
} from "framer-motion";

type props = {
  children: React.ReactNode;
} & MotionStyle;

const DEFAULT_WIDTH = 340;

function Resize(props: props) {
  const { children, ...rest } = props;
  const x = useMotionValue(DEFAULT_WIDTH);
  const width = useTransform(x, (x) => `${x}px`);
  return (
    <>
      <motion.div style={{ ...rest, width }}>{children}</motion.div>
      <motion.div
        drag="x"
        dragMomentum={false}
        dragConstraints={{
          left: DEFAULT_WIDTH,
          right: DEFAULT_WIDTH + 340,
        }}
        style={{
          x,
          width: "8px",
          height: "100%",
          position: "fixed",
          cursor: "ew-resize",
          top: 0,
        }}
        whileHover={{
          backgroundColor: "var(--chakra-colors-chakra-border-color)",
        }}
      />
    </>
  );
}

export default Resize;
