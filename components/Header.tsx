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
  useColorModeValue,
} from "@chakra-ui/react";
import { MoreVertical } from "react-feather";

import Logo from "./Logo";
import NavLink from "./misc/NavLink";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );

  return (
    <Box boxShadow={boxShadow} as="header" padding="2">
      <Container maxW="container.lg">
        <Flex as="nav" justifyContent="space-between">
          <Flex alignItems="center">
            <Box mr="4">
              <Logo />
            </Box>
            <NavLink href="/">
              <Text mr="4">Resumes</Text>
            </NavLink>
            <NavLink href="/templates">
              <Text mr="4">Templates</Text>
            </NavLink>
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
