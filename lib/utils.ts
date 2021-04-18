import { resume } from "../types";

const defaultResume = {
  id: "",
  name: "",
  updated: Date.now(),
};

function getStorageResume(id: string | string[]) {
  try {
    const resumes: resume[] = JSON.parse(localStorage.getItem("resumes")) || [];
    const data = resumes.find((item) => item.id === id) || defaultResume;

    return data;
  } catch {
    return defaultResume;
  }
}

function getStorageResumes() {
  try {
    const resumes: resume[] = JSON.parse(localStorage.getItem("resumes")) || [];
    return resumes;
  } catch {
    return [];
  }
}

function setStorageResumes(resumes: resume[]) {
  try {
    const value = JSON.stringify(resumes);
    localStorage.setItem("resumes", value);
    return value;
  } catch {
    return [];
  }
}

export default { getStorageResume, getStorageResumes, setStorageResumes };
