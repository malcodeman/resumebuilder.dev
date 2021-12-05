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
import { map } from "ramda";

import WorkspaceIllustration from "../../illustrations/Workspace";

const LIST = [
  {
    text: "Unlimited resumes",
  },
  {
    text: "Unlimited sections",
  },
  {
    text: "Unlimited downloads",
  },
];

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
      <Grid
        templateColumns={["1fr", `repeat(${LIST.length}, 1fr)`]}
        gap="2"
        mb="16"
      >
        {map(
          (item) => (
            <Flex alignItems="center">
              <Check size={16} style={{ marginRight: "0.5rem" }} />
              <Text mr="2">{item.text}</Text>
            </Flex>
          ),
          LIST
        )}
      </Grid>
      <Container maxW="container.sm" paddingInline="0">
        <WorkspaceIllustration fill={fill} stroke={stroke} />
      </Container>
    </Center>
  );
}

export default Footer;
