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
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { Upload } from "react-feather";
import { nanoid } from "nanoid";
import { useKeyboardEvent, useLocalStorageValue } from "@react-hookz/web";
import { useRouter } from "next/router";
import * as R from "ramda";

import Header from "../components/Header";
import NewResumeModal from "../components/resumes/NewResumeModal";
import ResumeItem from "../components/resumes/ResumeItem";
import ImportDataModal from "../components/ImportDataModal";

import { Resume, Template, Fields } from "../types";

function Home() {
  const router = useRouter();
  const {
    isOpen: isNewResumeModalOpen,
    onOpen: onNewResumeModalOpen,
    onClose: onNewResumeModalClose,
  } = useDisclosure();
  const {
    isOpen: isImportDataModalOpen,
    onOpen: onImportDataModalOpen,
    onClose: onImporDataModalClose,
  } = useDisclosure();
  const [resumes, setResumes] = useLocalStorageValue<Resume[]>("resumes", [], {
    initializeWithStorageValue: false,
  });

  useKeyboardEvent(
    "n",
    () => {
      onNewResumeModalOpen();
    },
    [],
    { event: "keyup" }
  );

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
        city: "",
        country: "",
        summary: "",
        section: [
          {
            name: "standardSection" as const,
            label: "Employment History",
            nested: [
              {
                title: "",
                subtitle: "",
                website: "",
                city: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
          },
          {
            name: "standardSection" as const,
            label: "Education",
            nested: [
              {
                title: "",
                subtitle: "",
                website: "",
                city: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
          },
          {
            name: "tagListSection" as const,
            label: "Skills",
            tags: "",
          },
          {
            name: "tagListSection" as const,
            label: "Hobbies",
            tags: "",
          },
        ],
      },
    };
    setResumes([...resumes, resume]);
    onNewResumeModalClose();
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
      updated: Date.now(),
      name: `${resume.name} copy`,
    };
    setResumes([...resumes, value]);
  }

  function handleOnNameChange(id: string, nextValue: string) {
    const nextResumes = R.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name: nextValue,
          updated: Date.now(),
        };
      }
      return item;
    }, resumes);
    setResumes(nextResumes);
  }

  function handleOnImport(fields: Fields) {
    const resume = {
      id: nanoid(),
      updated: Date.now(),
      name: "Untitled",
      template: Template.berlin,
      fields,
    };
    setResumes([...resumes, resume]);
    onImporDataModalClose();
    router.push(`/${resume.id}`);
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
            <ButtonGroup size="sm" isAttached>
              <Popover trigger="hover">
                <PopoverTrigger>
                  <Button
                    mr="-px"
                    data-cy="new_resume_btn"
                    onClick={onNewResumeModalOpen}
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
              <IconButton
                aria-label="Import"
                onClick={onImportDataModalOpen}
                icon={<Upload size={20} />}
              />
            </ButtonGroup>
          </Flex>
          {R.isEmpty(resumes) || R.isNil(resumes) ? (
            <Flex flexDirection="column" alignItems="center" padding="4">
              <Text>No Resumes</Text>
              <Text fontSize="small">Create a new resume to get started.</Text>
            </Flex>
          ) : (
            <Grid
              gap="4"
              gridTemplateColumns="repeat(auto-fill, minmax(270px, 1fr))"
              data-cy="resumes_grid"
            >
              {R.map(
                (item) => (
                  <ResumeItem
                    key={item.id}
                    resume={item}
                    onDelete={handleOnDelete}
                    onDuplicate={handleOnDuplicate}
                    onNameChange={handleOnNameChange}
                  />
                ),
                resumes
              )}
            </Grid>
          )}
        </Container>
      </Box>
      <NewResumeModal
        isOpen={isNewResumeModalOpen}
        onClose={onNewResumeModalClose}
        onSubmit={handleOnSubmit}
      />
      <ImportDataModal
        isOpen={isImportDataModalOpen}
        onClose={onImporDataModalClose}
        onImport={handleOnImport}
      />
    </>
  );
}

export default Home;
