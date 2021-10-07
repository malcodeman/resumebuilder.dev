import {
  Text,
  Flex,
  Box,
  Container,
  Button,
  LayoutProps,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

import Logo from "../Logo";
import NavLink from "../misc/NavLink";

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
              <Logo href="/" />
            </Box>
            <NavLink href="/">
              <Text mr="4">Home</Text>
            </NavLink>
            <NavLink href="/templates">
              <Text mr="4">Templates</Text>
            </NavLink>
            <NavLink href="/downloads">
              <Text mr="4">Downloads</Text>
            </NavLink>
          </Flex>
          <Link href="/resumes" passHref>
            <Button size="sm">Dashboard</Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
