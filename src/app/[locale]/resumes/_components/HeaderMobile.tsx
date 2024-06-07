import {
  Text,
  Flex,
  Box,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { FileTextIcon, HomeIcon, LayersIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import useLocalStorage from "hooks/useLocalStorage";
import NavLink from "components/misc/NavLink";
import UserMenu from "app/[locale]/resumes/_components/UserMenu";

function HeaderMobile() {
  const t = useTranslations();
  const backgroundColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px -2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0 -2px 0 0"
  );
  const viewDashboard = useLocalStorage("view-dashboard");
  const homeHref = viewDashboard ? "/resumes" : "/";
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
      zIndex="3"
    >
      <Container maxW="container.lg">
        <Flex as="nav" justifyContent="space-between" alignItems="center">
          <NavLink href={homeHref}>
            <Flex flexDirection="column" alignItems="center">
              <HomeIcon size={16} />
              <Text fontSize="xs">{t("home")}</Text>
            </Flex>
          </NavLink>
          <NavLink href="/templates">
            <Flex flexDirection="column" alignItems="center">
              <LayersIcon size={16} />
              <Text fontSize="xs">{t("templates")}</Text>
            </Flex>
          </NavLink>
          {viewDashboard.value ? (
            <UserMenu />
          ) : (
            <NavLink href="/resumes">
              <Flex flexDirection="column" alignItems="center">
                <FileTextIcon size={16} />
                <Text fontSize="xs">{t("dashboard")}</Text>
              </Flex>
            </NavLink>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

export default HeaderMobile;
