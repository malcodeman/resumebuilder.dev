import { useLocalStorageValue } from "@react-hookz/web";

function useProfilePicture() {
  const storage = useLocalStorageValue("profile-picture", {
    defaultValue: "",
    initializeWithValue: false,
  });
  return storage;
}

export { useProfilePicture };
