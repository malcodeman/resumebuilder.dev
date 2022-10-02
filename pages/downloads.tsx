import React from "react";
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
import { equals, map, toLower } from "ramda";
import AppleIcon from "simple-icons/icons/apple";
import MicrosoftIcon from "simple-icons/icons/microsoft";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Layout from "../components/Layout";
import SimpleIcon from "../components/misc/SimpleIcon";

function Downloads() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const downloads = React.useMemo(
    () => [
      {
        backgroundImage: equals(colorMode, "dark")
          ? "/macos_dark.jpg"
          : "/macos_light.jpg",
        icon: <SimpleIcon color="#fff" size={48} path={AppleIcon.path} />,
        title: "MacOS",
        textTransKey: "download_for_macos",
        isDisabled: true,
      },
      {
        backgroundImage: "/windows.jpg",
        icon: <SimpleIcon color="#fff" size={48} path={MicrosoftIcon.path} />,
        title: "Windows",
        textTransKey: "download_for_windows",
        isDisabled: true,
      },
    ],
    [colorMode]
  );
  return (
    <>
      <Head>
        <title>Downloads | resumebuilder.dev</title>
      </Head>
      <Layout>
        <Center mb="4">
          <Heading overflowWrap="anywhere">
            {t("resume_builder_for_mac_and_windows")}
          </Heading>
        </Center>
        <Container maxW="container.md" paddingInline="0">
          <Grid templateColumns={["1fr", "1fr 1fr"]} gap="8">
            {map(
              (item) => (
                <Tooltip key={item.title} label={t("coming_soon")}>
                  <Flex flexDirection="column">
                    <Box
                      padding="4"
                      borderTopRadius="md"
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
                    <Button
                      borderTopRadius="none"
                      data-cy={`downloads-${toLower(item.title)}`}
                      isDisabled={item.isDisabled}
                    >
                      {t(item.textTransKey)}
                    </Button>
                  </Flex>
                </Tooltip>
              ),
              downloads
            )}
          </Grid>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Downloads;
