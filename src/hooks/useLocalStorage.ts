import { useLocalStorageValue } from "@react-hookz/web";
import { LocalStorageKey } from "types";

function useLocalStorage(key: LocalStorageKey) {
  const storage = useLocalStorageValue(key, {
    defaultValue: false,
    initializeWithValue: false,
  });
  return storage;
}

export default useLocalStorage;
