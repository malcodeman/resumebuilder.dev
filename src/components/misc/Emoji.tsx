import { init } from "emoji-mart";
import data from "@emoji-mart/data";

init({ data });

type Props = {
  shortcodes: string;
};

function Emoji(props: Props) {
  const { shortcodes } = props;

  return <em-emoji shortcodes={shortcodes} size="16px" />;
}

export default Emoji;
