import {
  Text,
  Flex,
  Box,
  Container,
  LayoutProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { FileText, Home, Layers } from "react-feather";

import NavLink from "../misc/NavLink";

function HeaderMobile(props: LayoutProps) {
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px -2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0 -2px 0 0"
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
      right="0"
      bottom="0"
      zIndex="1"
    >
      <Container maxW="container.lg">
        <Flex as="nav" justifyContent="space-between" alignItems="center">
          <NavLink href="/">
            <Flex flexDirection="column" alignItems="center">
              <Home size={20} />
              <Text fontSize="xs">Home</Text>
            </Flex>
          </NavLink>
          <NavLink href="/templates">
            <Flex flexDirection="column" alignItems="center">
              <Layers size={20} />
              <Text fontSize="xs">Templates</Text>
            </Flex>
          </NavLink>
          <NavLink href="/resumes">
            <Flex flexDirection="column" alignItems="center">
              <FileText size={20} />
              <Text fontSize="xs">Dashboard</Text>
            </Flex>
          </NavLink>
        </Flex>
      </Container>
    </Box>
  );
}

export default HeaderMobile;
