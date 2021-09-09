import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { useMediaQuery } from "@react-hookz/web";

import Header from "./Header";
import HeaderMobile from "./HeaderMobile";

type props = {
  children: React.ReactNode;
};

function Layout(props: props) {
  const { children } = props;
  const isWide = useMediaQuery("(min-width: 768px)");
  const paddingBottom = isWide ? "8" : "calc(2rem + 54px)";

  return (
    <>
      {isWide ? <Header /> : <HeaderMobile />}
      <Box as="main" paddingTop="8" paddingBottom={paddingBottom}>
        <Container maxW="container.lg">{children}</Container>
      </Box>
    </>
  );
}

export default Layout;
