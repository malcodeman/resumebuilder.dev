import { useToast } from "@chakra-ui/toast";
import { length } from "ramda";
import { useTranslations } from "next-intl";
import utils from "lib/utils";
import { useHotkeys } from "react-hotkeys-hook";

const TOAST_ID = "onSave";
const SAVE_MESSAGE_TRANS_KEYS = [
  "save_message_description_1",
  "save_message_description_2",
  "save_message_description_3",
];

type props = {
  description?: string;
  duration?: number;
  isClosable?: boolean;
};

function useAutoSaveToast(props: props) {
  const {
    description = SAVE_MESSAGE_TRANS_KEYS[
      utils.getRandomInt(0, length(SAVE_MESSAGE_TRANS_KEYS))
    ],
    duration = 1000,
    isClosable = true,
  } = props;
  const t = useTranslations();
  const toast = useToast();

  function handleOnSave() {
    if (!toast.isActive(TOAST_ID)) {
      toast({
        id: TOAST_ID,
        description: t(description),
        duration,
        isClosable,
      });
    }
  }

  useHotkeys(["meta+s", "ctrl+s"], handleOnSave, {
    preventDefault: true,
  });
}

export default useAutoSaveToast;
