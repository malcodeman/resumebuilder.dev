import {
  Text,
  Flex,
  Box,
  Container,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

import useDashboard from "../../hooks/useDashboard";

import Logo from "../Logo";
import NavLink from "../misc/NavLink";
import LanguageSelect from "../misc/LanguageSelect";
import UserMenu from "./UserMenu";

function Header() {
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
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
      top="0"
      right="0"
      zIndex="1"
    >
      <Container maxW="container.lg">
        <Flex as="nav" justifyContent="space-between">
          <Flex alignItems="center">
            <Box mr="4">
              <Logo href={homeHref} />
            </Box>
            <NavLink href={homeHref} mr="4">
              <Text>Home</Text>
            </NavLink>
            <NavLink href="/templates" mr="4">
              <Text>Templates</Text>
            </NavLink>
            <NavLink href="/downloads" mr="4">
              <Text>Downloads</Text>
            </NavLink>
          </Flex>
          {dashboard ? (
            <Flex>
              <LanguageSelect mr="2" />
              <UserMenu />
            </Flex>
          ) : (
            <Flex>
              <LanguageSelect mr="2" />
              <Link href="/resumes" passHref>
                <Button size="sm" data-cy="dashboard-button">
                  Dashboard
                </Button>
              </Link>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
