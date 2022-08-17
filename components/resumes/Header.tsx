import {
  Text,
  Flex,
  Box,
  Container,
  LayoutProps,
  useColorModeValue,
} from "@chakra-ui/react";

import Logo from "../Logo";
import NavLink from "../misc/NavLink";
import UserMenu from "./UserMenu";

function Header(props: LayoutProps) {
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );

  return (
    <Box
      {...props}
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
              <Logo href="/resumes" />
            </Box>
            <NavLink href="/resumes" mr="4">
              <Text>Home</Text>
            </NavLink>
            <NavLink href="/templates" mr="4">
              <Text>Templates</Text>
            </NavLink>
            <NavLink href="/downloads" mr="4">
              <Text>Downloads</Text>
            </NavLink>
          </Flex>
          <UserMenu />
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
