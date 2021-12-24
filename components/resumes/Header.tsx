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
  LayoutProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoreVertical } from "react-feather";

import Logo from "../Logo";
import NavLink from "../misc/NavLink";

function Header(props: LayoutProps) {
  const { colorMode, toggleColorMode } = useColorMode();
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
