import { useLocalStorageValue } from "@react-hookz/web";
import { NextState } from "@react-hookz/web/src/util/resolveHookState";
import { LocalStorageKey } from "types";

function useLocalStorage(
  key: LocalStorageKey
): [boolean, (val: NextState<boolean, boolean>) => void] {
  const { value, set } = useLocalStorageValue(key, {
    defaultValue: false,
    initializeWithValue: false,
  });
  return [value, set];
}

export default useLocalStorage;
