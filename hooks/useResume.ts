import { useLocalStorageValue } from "@react-hookz/web";
import { useRouter } from "next/router";
import * as R from "ramda";

import { Resume } from "../types";

function useResume(): [Resume, (nextResume: Resume) => void, () => void] {
  const router = useRouter();
  const { id } = router.query;
  const [resumes, setResumes] = useLocalStorageValue<Resume[] | null>(
    "resumes",
    [],
    {
      initializeWithStorageValue: false,
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
