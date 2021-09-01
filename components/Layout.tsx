import React from "react";
import { Box, Container } from "@chakra-ui/react";

import Header from "./Header";

type props = {
  children: React.ReactNode;
};

function Layout(props: props) {
  const { children } = props;

  return (
    <>
      <Header />
      <Box as="main" mt="140px">
        <Container maxW="container.lg">{children}</Container>
      </Box>
    </>
  );
}

export default Layout;
