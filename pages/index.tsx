import Head from "next/head";
import {
  Box,
  Container,
  Flex,
  Button,
  useDisclosure,
  Text,
  SimpleGrid,
  IconButton,
} from "@chakra-ui/react";
import { MoreHorizontal, Plus } from "react-feather";
import { nanoid } from "nanoid";
import { formatDistanceToNow } from "date-fns";

import Header from "../components/Header";
import NewResumeModal from "../components/NewResumeModal";

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const resumes = JSON.parse(localStorage.getItem("resumes")) || [];

  function handleOnSubmit(data: { name: string }) {
    const resume = { id: nanoid(), updated: new Date(), name: data.name };
    const value = JSON.stringify([...resumes, resume]);

    localStorage.setItem("resumes", value);
    onClose();
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
            {resumes.map(
              (item: { id: string; name: string; updated: string }) => (
                <Flex key={item.id} direction="column">
                  <Box
                    backgroundColor="#f3f3f3"
                    height="360px"
                    marginBottom="10px"
                    borderRadius="lg"
                  />
                  <Flex justifyContent="space-between" alignItems="center">
                    <Box>
                      <Text>{item.name}</Text>
                      <Text opacity="0.5">
                        {formatDistanceToNow(Date.parse(item.updated), {
                          addSuffix: true,
                        })}
                      </Text>
                    </Box>
                    <IconButton
                      size="sm"
                      aria-label="More options"
                      icon={<MoreHorizontal size={20} />}
                    />
                  </Flex>
                </Flex>
              )
            )}
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
