"use client";
import { useState, useEffect } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { useResumes } from "hooks/useResumes";
import { useRouter } from "navigation";

function NewResumePage() {
  const { createNew, resumes } = useResumes();
  const router = useRouter();
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    if (resumes && !isRedirected) {
      const resume = createNew();
      router.push(`/resumes/${resume.id}`);
      setIsRedirected(true);
    }
  }, [resumes, isRedirected, createNew, router]);

  return (
    <Center flexDirection="column" minH="100vh" padding="4">
      <Spinner data-testid="spinner" />
    </Center>
  );
}

export default NewResumePage;
