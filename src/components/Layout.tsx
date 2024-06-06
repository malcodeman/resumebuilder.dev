import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { useMediaQuery } from "@react-hookz/web";
import { and, isNil, ifElse } from "ramda";
import Header from "app/[locale]/resumes/_components/Header";
import HeaderMobile from "app/[locale]/resumes/_components/HeaderMobile";

type Props = {
  children: React.ReactNode;
};

function Layout(props: Props) {
  const { children } = props;
  const isLargeDevice = useMediaQuery("(min-width: 62em)", {
    initializeWithValue: false,
  });
  return (
    <>
      {isLargeDevice ? <Header /> : null}
      <Box
        as="main"
        overflow="hidden"
        paddingTop={{ base: "8", lg: "calc(2rem + 48px)" }}
        paddingBottom={{ base: "calc(2rem + 54px)", lg: "8" }}
      >
        <Container maxW="container.lg">{children}</Container>
      </Box>
      {ifElse(
        () => and(!isNil(isLargeDevice), !isLargeDevice),
        () => <HeaderMobile />,
        () => null
      )()}
    </>
  );
}

export default Layout;
