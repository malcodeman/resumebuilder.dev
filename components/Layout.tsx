import React from "react";
import { Box, Container } from "@chakra-ui/react";

import Header from "./resumes/Header";
import HeaderMobile from "./resumes/HeaderMobile";

type props = {
  children: React.ReactNode;
};

function Layout(props: props) {
  const { children } = props;
  return (
    <>
      <Header display={{ base: "none", lg: "block" }} />
      <Box
        as="main"
        paddingTop={{ base: "8", lg: "calc(2rem + 48px)" }}
        paddingBottom={{ base: "calc(2rem + 54px)", lg: "8" }}
      >
        <Container maxW="container.lg">{children}</Container>
      </Box>
      <HeaderMobile display={{ base: "block", lg: "none" }} />
    </>
  );
}

export default Layout;
