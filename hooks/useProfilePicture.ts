import { useLocalStorageValue } from "@react-hookz/web";
import { NextState } from "@react-hookz/web/cjs/util/resolveHookState";

function useProfilePicture(): [
  string,
  (val: NextState<string, string>) => void
] {
  const [picture, setPicture] = useLocalStorageValue("profile-picture", "", {
    initializeWithStorageValue: false,
  });
  return [picture, setPicture];
}

export default useProfilePicture;
