import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { useLocalStorageValue } from "@react-hookz/web";

import HeaderDashboard from "./resumes/Header";
import HeaderDashboardMobile from "./resumes/HeaderMobile";
import HeaderLanding from "./landing/Header";
import HeaderLandingMobile from "./landing/HeaderMobile";

type props = {
  children: React.ReactNode;
};

function Layout(props: props) {
  const { children } = props;
  const [showDashboard] = useLocalStorageValue("showDashboard", false, {
    initializeWithStorageValue: false,
  });
  return (
    <>
      {showDashboard ? (
        <HeaderDashboard display={{ base: "none", lg: "block" }} />
      ) : (
        <HeaderLanding display={{ base: "none", lg: "block" }} />
      )}
      <Box
        as="main"
        paddingTop={{ base: "8", lg: "calc(2rem + 48px)" }}
        paddingBottom={{ base: "calc(2rem + 54px)", lg: "8" }}
      >
        <Container maxW="container.lg">{children}</Container>
      </Box>
      {showDashboard ? (
        <HeaderDashboardMobile display={{ base: "block", lg: "none" }} />
      ) : (
        <HeaderLandingMobile display={{ base: "block", lg: "none" }} />
      )}
    </>
  );
}

export default Layout;
