import {
  Text,
  Flex,
  Box,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiFileText, FiHome, FiLayers } from "react-icons/fi";

import useDashboard from "../../hooks/useDashboard";

import NavLink from "../misc/NavLink";
import UserMenu from "./UserMenu";

function HeaderMobile() {
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px -2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0 -2px 0 0"
  );
  const { dashboard } = useDashboard();
  const homeHref = dashboard ? "/resumes" : "/";
  return (
    <Box
      backgroundColor={backgroundColor}
      boxShadow={boxShadow}
      as="header"
      paddingY="2"
      position="fixed"
      left="0"
      right="0"
      bottom="0"
      zIndex="1"
    >
      <Container maxW="container.lg">
        <Flex as="nav" justifyContent="space-between" alignItems="center">
          <NavLink href={homeHref}>
            <Flex flexDirection="column" alignItems="center">
              <FiHome />
              <Text fontSize="xs">Home</Text>
            </Flex>
          </NavLink>
          <NavLink href="/templates">
            <Flex flexDirection="column" alignItems="center">
              <FiLayers />
              <Text fontSize="xs">Templates</Text>
            </Flex>
          </NavLink>
          {dashboard ? (
            <UserMenu />
          ) : (
            <NavLink href="/resumes">
              <Flex flexDirection="column" alignItems="center">
                <FiFileText />
                <Text fontSize="xs">Dashboard</Text>
              </Flex>
            </NavLink>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

export default HeaderMobile;
