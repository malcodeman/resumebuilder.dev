import {
  Box,
  Grid,
  Center,
  Heading,
  Flex,
  Text,
  Container,
  Button,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import Head from "next/head";
import * as R from "ramda";
import SimpleIcons from "simple-icons";

import Layout from "../components/Layout";
import SimpleIcon from "../components/misc/SimpleIcon";

function Downloads() {
  const { colorMode } = useColorMode();
  const DOWNLOADS = [
    {
      backgroundImage:
        colorMode === "dark" ? "/macos_dark.jpg" : "/macos_light.jpg",
      icon: (
        <SimpleIcon
          color="#fff"
          size={48}
          path={SimpleIcons.Get("apple").path}
        />
      ),
      title: "MacOS",
      text: "Download for MacOS",
      isDisabled: true,
    },
    {
      backgroundImage: "/windows.jpg",
      icon: (
        <SimpleIcon
          color="#fff"
          size={48}
          path={SimpleIcons.Get("microsoft").path}
        />
      ),
      title: "Windows",
      text: "Download for Windows",
      isDisabled: true,
    },
  ];
  return (
    <>
      <Head>
        <title>Downloads - resumebuilder.dev</title>
      </Head>
      <Layout>
        <Center mb="4">
          <Heading>resumebuilder.dev for Mac & Windows</Heading>
        </Center>
        <Container maxW="container.md">
          <Grid templateColumns={["1fr", "1fr 1fr"]} gap="8">
            {R.map(
              (item) => (
                <Tooltip key={item.title} label="Coming Soon">
                  <Flex flexDirection="column">
                    <Box
                      padding="4"
                      borderTopRadius="lg"
                      backgroundSize="cover"
                      backgroundPosition="center"
                      backgroundImage={item.backgroundImage}
                    >
                      <Center flexDirection="column">
                        <Text color="#fff" mb="2" fontSize="4xl">
                          {item.title}
                        </Text>
                        {item.icon}
                      </Center>
                    </Box>
                    <Button borderTopRadius="none" isDisabled={item.isDisabled}>
                      {item.text}
                    </Button>
                  </Flex>
                </Tooltip>
              ),
              DOWNLOADS
            )}
          </Grid>
        </Container>
      </Layout>
    </>
  );
}

export default Downloads;
