import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { useMediaQuery } from "@react-hookz/web";

import Header from "./resumes/Header";
import HeaderMobile from "./resumes/HeaderMobile";

type props = {
  children: React.ReactNode;
};

function Layout(props: props) {
  const { children } = props;
  const isLargeDevice = useMediaQuery("(min-width: 62em)");
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
      {isLargeDevice ? null : <HeaderMobile />}
    </>
  );
}

export default Layout;
