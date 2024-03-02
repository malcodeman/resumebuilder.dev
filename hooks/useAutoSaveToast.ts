import React from "react";
import { useToast } from "@chakra-ui/toast";
import { length } from "ramda";
import { useMountEffect } from "@react-hookz/web";
import { useTranslations } from "next-intl";

import utils from "../lib/utils";

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
  const [keyboardJs, setKeyboardJs] = React.useState(null);
  const toast = useToast();

  useMountEffect(() => {
    import("keyboardjs").then((k) => setKeyboardJs(k.default || k));
  });

  React.useEffect(() => {
    if (!keyboardJs) {
      return;
    }

    function handleOnSave(event: React.KeyboardEvent) {
      event.preventDefault();
      if (!toast.isActive(TOAST_ID)) {
        toast({
          id: TOAST_ID,
          description: t(description),
          duration,
          isClosable,
        });
      }
    }

    keyboardJs.bind(`ctrl + s`, handleOnSave);
    keyboardJs.bind(`command + s`, handleOnSave);
    return () => {
      keyboardJs.unbind(`ctrl + s`, handleOnSave);
      keyboardJs.unbind(`command + s`, handleOnSave);
    };
  }, [keyboardJs, toast, description, duration, isClosable, t]);
}

export default useAutoSaveToast;
