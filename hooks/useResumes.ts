import { useLocalStorageValue } from "@react-hookz/web";
import { nanoid } from "nanoid";
import {
  equals,
  filter,
  find,
  findIndex,
  map,
  propEq,
  move as ramdaMove,
  clone,
  and,
  or,
  isEmpty,
} from "ramda";
import { getDate, getMonth } from "date-fns";

import { DEFAULT_VALUES } from "../lib/constants";

import { Design, Fields, Resume } from "../types";

type props = {
  isolated?: boolean;
  handleStorageEvent?: boolean;
  storeDefaultValue?: boolean;
  initializeWithStorageValue?: boolean;
};

function useResumes(props: props = {}) {
  const {
    isolated = false,
    handleStorageEvent = true,
    storeDefaultValue = false,
    initializeWithStorageValue = false,
  } = props;
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

  function remove(id: string) {
    const nextResumes = filter((item) => item.id !== id, resumes);
    setResumes(nextResumes);
  }

  function duplicate(id: string) {
    const resume = find((item) => equals(item.id, id), resumes);
    const value = {
      ...clone(resume),
      id: nanoid(),
      title: `${resume.title} copy`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setResumes([...resumes, value]);
  }

  function changeTitle(id: string, title: string) {
    if (!isEmpty(title)) {
      const nextResumes = map((item) => {
        if (equals(item.id, id)) {
          return {
            ...item,
            title,
          };
        }
        return item;
      }, resumes);
      setResumes(nextResumes);
    }
  }

  function changeIcon(id: string, icon: string) {
    if (!isEmpty(icon)) {
      const nextResumes = map((item) => {
        if (equals(item.id, id)) {
          return {
            ...item,
            icon,
          };
        }
        return item;
      }, resumes);
      setResumes(nextResumes);
    }
  }

  function getIcon() {
    const day = getDate(new Date());
    const month = getMonth(new Date());
    const isHalloween = and(equals(day, 31), equals(month, 9));
    const isNewYear = or(
      and(equals(day, 31), equals(month, 11)),
      and(equals(day, 1), equals(month, 0))
    );

    if (isHalloween) {
      return ":ghost:";
    }
    if (isNewYear) {
      return ":fireworks:";
    }
    return "";
  }

  function createNew(data?: { fields?: Fields; design?: Design }) {
    const resume = {
      ...DEFAULT_VALUES,
      ...data?.fields,
      id: nanoid(),
      title: "Untitled resume",
      icon: getIcon(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      design: {
        ...DEFAULT_VALUES.design,
        ...data?.design,
      },
    };
    setResumes([...resumes, resume]);
    return resume;
  }

  function move(fromId: string, toId: string) {
    const fromIndex = findIndex(propEq("id", fromId))(resumes);
    const toIndex = findIndex(propEq("id", toId))(resumes);
    const nextResumes = ramdaMove(fromIndex, toIndex, resumes);
    setResumes(nextResumes);
  }

  function findById(id: string) {
    return find((item) => equals(item.id, id), resumes);
  }

  return {
    resumes,
    setResumes,
    remove,
    duplicate,
    changeTitle,
    changeIcon,
    createNew,
    move,
    findById,
  };
}

export default useResumes;
