import { useLocalStorageValue } from "@react-hookz/web";
import { NextState } from "@react-hookz/web/cjs/util/resolveHookState";

import { LocalStorageKey } from "../types";

function useLocalStorage(
  key: LocalStorageKey
): [boolean, (val: NextState<boolean, boolean>) => void] {
  const [value, setValue] = useLocalStorageValue(key, false, {
    initializeWithStorageValue: false,
  });
  return [value, setValue];
}

export default useLocalStorage;
