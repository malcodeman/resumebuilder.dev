import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Poser5 from "illustrations/Poser5";
import { Link } from "navigation";

type Props = {
  description?: string;
  link?: string;
};

function NotFound(props: Props) {
  const t = useTranslations();
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
