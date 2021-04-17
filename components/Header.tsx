import { Text, Flex, Box, Container } from "@chakra-ui/react";

import Logo from "./Logo";

function Header() {
  return (
    <Box as="header" padding="20px 0">
      <Container maxW="container.lg">
        <Flex as="nav">
          <Logo />
          <Text ml="20px" mr="20px">
            Resumes
          </Text>
          <Text mr="20px">Templates</Text>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
