import { useLocalStorageValue } from "@react-hookz/web";
import { useRouter } from "next/router";
import { isNil, find, map, filter, equals, or } from "ramda";

import { Resume } from "../types";

type props = {
  isolated?: boolean;
  handleStorageEvent?: boolean;
  storeDefaultValue?: boolean;
  initializeWithStorageValue?: boolean;
};

function useResume(props: props = {}) {
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
  const resume = isNil(resumes)
    ? undefined
    : find((item) => equals(item.id, id), resumes);
  const isLoading = or(isNil(id), isNil(resumes));

  function setResume(nextResume: Resume) {
    const nextResumes = map((item) => {
      if (equals(item.id, id)) {
        return nextResume;
      }
      return item;
    }, resumes);
    setResumes(nextResumes);
  }

  function remove() {
    const nextResumes = filter((item) => item.id !== id, resumes);
    setResumes(nextResumes);
  }

  function changeTitle(title: string) {
    setResume({
      ...resume,
      title,
      updatedAt: Date.now(),
    });
  }

  function changeIcon(icon: string) {
    setResume({
      ...resume,
      icon,
      updatedAt: Date.now(),
    });
  }

  function changeSlug(slug: string) {
    const taken = find((item) => equals(item.id, slug), resumes);
    if (!taken) {
      const nextResume = {
        ...resume,
        id: slug,
      };
      setResume(nextResume);
      return nextResume;
    }
    return undefined;
  }

  return {
    resume,
    isLoading,
    setResume,
    remove,
    changeTitle,
    changeIcon,
    changeSlug,
  };
}

export default useResume;
