import { useLocalStorageValue } from "@react-hookz/web";
import { NextState } from "@react-hookz/web/src/util/resolveHookState";

function useProfilePicture(): [
  string,
  (val: NextState<string, string>) => void
] {
  const { value: picture, set: setPicture } = useLocalStorageValue(
    "profile-picture",
    {
      defaultValue: "",
      initializeWithValue: false,
    }
  );
  return [picture, setPicture];
}

export default useProfilePicture;
