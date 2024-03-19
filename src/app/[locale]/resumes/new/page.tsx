"use client";
import { Center, Spinner } from "@chakra-ui/react";
import useResumes from "hooks/useResumes";
import { useRouter } from "navigation";
import { useEffect } from "react";

function NewResumePage() {
  const { resumes, createNew } = useResumes();
  const router = useRouter();

  useEffect(() => {
    if (resumes) {
      if (resumes.length > 0) {
        router.push(`/resumes/${resumes[0].id}`);
      } else {
        const resume = createNew();
        if (resume) {
          router.push(`/resumes/${resume.id}`);
        }
      }
    }
  }, [createNew, resumes, router]);

  return (
    <Center flexDirection="column" minH="100vh" padding="4">
      <Spinner />
    </Center>
  );
}

export default NewResumePage;
