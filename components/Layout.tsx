import React from "react";
import { Box, Container } from "@chakra-ui/react";

import HeaderDashboard from "./resumes/Header";
import HeaderDashboardMobile from "./resumes/HeaderMobile";
import HeaderLanding from "./landing/Header";
import HeaderLandingMobile from "./landing/HeaderMobile";

import useDashboard from "../hooks/useDashboard";

type props = {
  children: React.ReactNode;
};

function Layout(props: props) {
  const { children } = props;
  const { dashboard } = useDashboard();
  return (
    <>
      {dashboard ? (
        <HeaderDashboard display={{ base: "none", lg: "block" }} />
      ) : (
        <HeaderLanding display={{ base: "none", lg: "block" }} />
      )}
      <Box
        as="main"
        overflow="hidden"
        paddingTop={{ base: "8", lg: "calc(2rem + 48px)" }}
        paddingBottom={{ base: "calc(2rem + 54px)", lg: "8" }}
      >
        <Container maxW="container.lg">{children}</Container>
      </Box>
      {dashboard ? (
        <HeaderDashboardMobile display={{ base: "block", lg: "none" }} />
      ) : (
        <HeaderLandingMobile display={{ base: "block", lg: "none" }} />
      )}
    </>
  );
}

export default Layout;
