import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import Poser5 from "../../illustrations/Poser5";

type props = {
  description?: string;
  link?: string;
};

function NotFound(props: props) {
  const { t } = useTranslation();
  const { description = t("404_description"), link = "/" } = props;
  return (
    <Center flexDirection="column" minH="100vh" padding="4">
      <Box maxW="222px" mb="4">
        <Poser5 />
      </Box>
      <Heading maxW="md" fontSize="2xl" mb="4">
        {description}
      </Heading>
      <Link href={link} passHref>
        <Button>{t("return_home")}</Button>
      </Link>
    </Center>
  );
}

export default NotFound;