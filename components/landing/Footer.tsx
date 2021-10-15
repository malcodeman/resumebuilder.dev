import {
  Center,
  Heading,
  Flex,
  Button,
  Text,
  Container,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Check } from "react-feather";

import WorkspaceIllustration from "../../illustrations/Workspace";

type props = {
  onSubmit: () => void;
};

function Footer(props: props) {
  const { onSubmit } = props;
  const fill = useColorModeValue(
    "var(--chakra-colors-blue-500)",
    "var(--chakra-colors-blue-200)"
  );
  const stroke = useColorModeValue("currentColor", "#fff");

  return (
    <Center as="section" flexDirection="column">
      <Heading mb="4">Get started with Resume Builder</Heading>
      <Button
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        colorScheme="blue"
        mb="4"
        onClick={onSubmit}
      >
        Build for free
      </Button>
      <Grid templateColumns={["1fr", "1fr 1fr"]} gap="2" mb="16">
        <Flex alignItems="center">
          <Check size={16} style={{ marginRight: "0.5rem" }} />
          <Text mr="2">Unlimited resumes</Text>
        </Flex>
        <Flex alignItems="center">
          <Check size={16} style={{ marginRight: "0.5rem" }} />
          <Text mr="2">Unlimited sections</Text>
        </Flex>
      </Grid>
      <Container maxW="container.sm" paddingInline="0">
        <WorkspaceIllustration fill={fill} stroke={stroke} />
      </Container>
    </Center>
  );
}

export default Footer;
