import { useLocalStorageValue } from "@react-hookz/web";
import { useRouter } from "next/router";
import * as R from "ramda";

import { Resume } from "../types";

type props = {
  isolated?: boolean;
  handleStorageEvent?: boolean;
  storeDefaultValue?: boolean;
  initializeWithStorageValue?: boolean;
};

function useResume(
  props: props = {}
): [Resume, (nextResume: Resume) => void, () => void] {
  const {
    isolated = false,
    handleStorageEvent = true,
    storeDefaultValue = false,
    initializeWithStorageValue = false,
  } = props;
  const router = useRouter();
  const { id } = router.query;
  const [resumes, setResumes] = useLocalStorageValue<Resume[] | null>(
    "resumes",
    [],
    {
      isolated,
      handleStorageEvent,
      storeDefaultValue,
      initializeWithStorageValue,
    }
  );
  const resume = R.isNil(resumes)
    ? undefined
    : R.find((item) => item.id === id, resumes);

  function setResume(nextResume: Resume) {
    const nextResumes = R.map((item) => {
      if (item.id === id) {
        return nextResume;
      }
      return item;
    }, resumes);
    setResumes(nextResumes);
  }

  function removeResume() {
    const nextResumes = R.filter((item) => item.id !== id, resumes);
    setResumes(nextResumes);
  }

  return [resume, setResume, removeResume];
}

export default useResume;
