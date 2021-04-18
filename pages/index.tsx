import React from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Flex,
  Button,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import { Plus } from "react-feather";
import { nanoid } from "nanoid";

import Header from "../components/Header";
import NewResumeModal from "../components/NewResumeModal";
import ResumeItem from "../components/ResumeItem";

import utils from "../lib/utils";
import { resume } from "../types";

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resumes, setResumes] = React.useState<resume[]>(
    utils.getStorageResumes()
  );

  React.useEffect(() => {
    utils.setStorageResumes(resumes);
  }, [resumes.length]);

  function handleOnSubmit(data: { name: string }) {
    const resume = { id: nanoid(), updated: Date.now(), name: data.name };
    setResumes([...resumes, resume]);
    onClose();
  }

  function handleOnDelete(id: string) {
    const newResumes = resumes.filter((item) => item.id !== id);
    setResumes(newResumes);
  }

  function handleOnDuplicate(id: string) {
    const resume = resumes.find((item) => item.id === id);
    const value = {
      ...resume,
      id: nanoid(),
      updated: Date.now(),
    };
    setResumes([...resumes, value]);
  }

  return (
    <>
      <Head>
        <title>CV-builder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Box as="main" mt="140px">
        <Container maxW="container.lg">
          <Flex justifyContent="flex-end" mb="20px">
            <Button size="sm" leftIcon={<Plus size={20} />} onClick={onOpen}>
              New
            </Button>
          </Flex>
          <SimpleGrid minChildWidth="270px" spacing="20px">
            {resumes.map((item) => (
              <ResumeItem
                key={item.id}
                id={item.id}
                name={item.name}
                updated={item.updated}
                onDelete={handleOnDelete}
                onDuplicate={handleOnDuplicate}
              />
            ))}
          </SimpleGrid>
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
