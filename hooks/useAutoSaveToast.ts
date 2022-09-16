import React from "react";
import { useToast } from "@chakra-ui/toast";
import { length } from "ramda";

import utils from "../lib/utils";

const TOAST_ID = "onSave";

type props = {
  description?: string;
  duration?: number;
  isClosable?: boolean;
};

function useAutoSaveToast(props: props) {
  const saveMessages = [
    "Your work is saved automatically.",
    "💾 No need to hit save. Your changes are saved automatically.",
    "Don't worry about this save stuff. We got you. 💪",
  ];
  const {
    description = saveMessages[utils.getRandomInt(0, length(saveMessages))],
    duration = 1000,
    isClosable = true,
  } = props;
  const [keyboardJs, setKeyboardJs] = React.useState(null);
  const toast = useToast();

  React.useEffect(() => {
    import("keyboardjs").then((k) => setKeyboardJs(k.default || k));
  }, []);

  React.useEffect(() => {
    if (!keyboardJs) {
      return;
    }

    function handleOnSave(event: React.KeyboardEvent) {
      event.preventDefault();
      if (!toast.isActive(TOAST_ID)) {
        toast({
          id: TOAST_ID,
          description,
          duration,
          isClosable,
        });
      }
    }

    keyboardJs.bind(`ctrl + s`, handleOnSave);
    keyboardJs.bind(`command + s`, handleOnSave);
    return () => {
      keyboardJs.unbind(`ctrl + s`, handleOnSave);
      keyboardJs.bind(`command + s`, handleOnSave);
    };
  }, [keyboardJs, toast, description, duration, isClosable]);
}

export default useAutoSaveToast;
