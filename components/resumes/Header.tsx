import {
  Text,
  Flex,
  Box,
  Container,
  Button,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useNetworkState } from "@react-hookz/web";

import useLocalStorage from "../../hooks/useLocalStorage";
import useProfilePicture from "../../hooks/useProfilePicture";

import Logo from "../Logo";
import NavLink from "../misc/NavLink";
import LanguageSelect from "../misc/LanguageSelect";
import UserMenu from "./UserMenu";
import OfflineTag from "../misc/OfflineTag";

function Header() {
  const { t } = useTranslation();
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );
  const [viewDashboard] = useLocalStorage("view-dashboard");
  const [profilePicture] = useProfilePicture();
  const homeHref = viewDashboard ? "/resumes" : "/";
  const network = useNetworkState();
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
      zIndex="3"
    >
      <Container maxW="container.lg">
        <Flex as="nav" justifyContent="space-between">
          <Flex alignItems="center">
            <Box mr="4">
              <Logo href={homeHref} />
            </Box>
            <NavLink href={homeHref} mr="4">
              <Text data-cy="home-text">{t("home")}</Text>
            </NavLink>
            <NavLink href="/templates" mr="4">
              <Text data-cy="templates-text">{t("templates")}</Text>
            </NavLink>
            <NavLink href="/about" mr="4">
              <Text data-cy="about-text">{t("about")}</Text>
            </NavLink>
          </Flex>
          {viewDashboard ? (
            <Flex>
              {network.online ? null : <OfflineTag mr="2" />}
              <LanguageSelect mr="2" />
              <UserMenu />
            </Flex>
          ) : (
            <Flex>
              <LanguageSelect mr="2" />
              <Link href="/resumes" passHref>
                <Button
                  size="sm"
                  leftIcon={
                    profilePicture ? (
                      <Avatar src={profilePicture} size="xs" />
                    ) : null
                  }
                  data-cy="dashboard-button"
                >
                  {t("dashboard")}
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
