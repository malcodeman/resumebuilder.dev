import { useLocalStorageValue } from "@react-hookz/web";
import { useParams } from "next/navigation";
import { isNil, find, map, filter, equals, or, clone } from "ramda";
import { nanoid } from "nanoid";
import { Resume } from "types";

function useResume() {
  const id = useParams().id;
  const { value: resumes, set: setResumes } = useLocalStorageValue<
    Resume[] | undefined
  >("resumes", {
    defaultValue: [],
    initializeWithValue: false,
  });
  const resume = isNil(resumes)
    ? undefined
    : find((item) => equals(item.id, id), resumes);
  const isLoading = or(isNil(id), isNil(resumes));

  function setResume(nextResume: Resume) {
    setResumes((prevResumes) => {
      if (prevResumes) {
        return map((item) => {
          if (equals(item.id, id)) {
            return nextResume;
          }
          return item;
        }, prevResumes);
      }
      return prevResumes;
    });
  }

  function remove() {
    const nextResumes = filter((item) => item.id !== id, resumes);
    setResumes(nextResumes);
  }

  function changeProperty(property: keyof Resume, value: string) {
    setResume({
      ...resume,
      [property]: value,
    });
  }

  function changeTitle(title: string) {
    changeProperty("title", title);
  }

  function changeIcon(icon: string) {
    changeProperty("icon", icon);
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

  function duplicate() {
    const value = {
      ...clone(resume),
      id: nanoid(),
      title: `${resume.title} copy`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setResumes((prevResumes) => [...prevResumes, value]);
  }

  return {
    resume,
    isLoading,
    setResume,
    remove,
    changeTitle,
    changeIcon,
    changeSlug,
    duplicate,
  };
}

export default useResume;
