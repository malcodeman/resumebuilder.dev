import {
  Text,
  Flex,
  Box,
  Container,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverBody,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import { MoreVertical } from "react-feather";

import Logo from "./Logo";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  console.log("colorMode - ", colorMode);

  return (
    <Box as="header" padding="20px 0">
      <Container maxW="container.lg">
        <Flex as="nav" justifyContent="space-between">
          <Flex alignItems="center">
            <Logo />
            <Text ml="20px" mr="20px">
              Resumes
            </Text>
            <Text mr="20px">Templates</Text>
          </Flex>
          <Popover>
            <PopoverTrigger>
              <IconButton
                size="sm"
                aria-label="More options"
                icon={<MoreVertical size={20} />}
              />
            </PopoverTrigger>
            <PopoverContent width="unset">
              <PopoverBody>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Dark mode</FormLabel>
                  <Switch
                    isChecked={colorMode === "dark"}
                    onChange={toggleColorMode}
                  />
                </FormControl>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
