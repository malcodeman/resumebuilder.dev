import React from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Flex,
  Button,
  useDisclosure,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Kbd,
} from "@chakra-ui/react";
import { Plus } from "react-feather";
import { nanoid } from "nanoid";
import { useKeyPressEvent, useLocalStorage } from "react-use";
import { useRouter } from "next/router";

import Header from "../components/Header";
import NewResumeModal from "../components/NewResumeModal";
import ResumeItem from "../components/ResumeItem";

import { Resume, Template } from "../types";

function Home() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resumes, setResumes] = useLocalStorage<Resume[]>("resumes", []);

  useKeyPressEvent("n", onOpen);

  function handleOnSubmit(data: { name: string }) {
    const resume = {
      id: nanoid(),
      updated: Date.now(),
      name: data.name,
      template: Template.berlin,
      fields: {
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        summary: "",
        employment: [],
        education: [],
        skill: [],
      },
    };
    setResumes([...resumes, resume]);
    onClose();
    router.push(`/${resume.id}`);
  }

  function handleOnDelete(id: string) {
    const nextResumes = resumes.filter((item) => item.id !== id);
    setResumes(nextResumes);
  }

  function handleOnDuplicate(id: string) {
    const resume = resumes.find((item) => item.id === id);
    const value = {
      ...resume,
      id: nanoid(),
      name: `${resume.name} copy`,
      updated: Date.now(),
    };
    setResumes([...resumes, value]);
  }

  return (
    <>
      <Head>
        <title>resumebuilder.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Box as="main" mt="140px">
        <Container maxW="container.lg">
          <Flex justifyContent="flex-end" mb="4">
            <Popover trigger="hover">
              <PopoverTrigger>
                <Button
                  size="sm"
                  leftIcon={<Plus size={20} />}
                  onClick={onOpen}
                  data-cy="new_resume_btn"
                >
                  New
                </Button>
              </PopoverTrigger>
              <PopoverContent width="unset">
                <PopoverBody display="inline-flex" alignItems="center">
                  <Text marginInlineEnd="2" fontSize="sm">
                    Press
                  </Text>
                  <Kbd>N</Kbd>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
          {resumes.length === 0 && (
            <Flex flexDirection="column" alignItems="center" padding="4">
              <Text>No Resumes</Text>
              <Text fontSize="small">Create a new resume to get started.</Text>
            </Flex>
          )}
          <Grid
            gap="4"
            gridTemplateColumns="repeat(auto-fill, minmax(270px, 1fr))"
            data-cy="resumes_grid"
          >
            {resumes.map((item) => (
              <ResumeItem
                key={item.id}
                resume={item}
                onDelete={handleOnDelete}
                onDuplicate={handleOnDuplicate}
              />
            ))}
          </Grid>
        </Container>
      </Box>
      <NewResumeModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleOnSubmit}
      />
    </>
  );
}

export default Home;
