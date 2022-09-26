import {
  Center,
  Heading,
  Flex,
  Button,
  Text,
  Grid,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { length, map } from "ramda";

import Poser20 from "../../illustrations/Poser20";

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
  return (
    <Center as="section" flexDirection="column">
      <Heading mb="4">Get started with Resume Builder</Heading>
      <Button
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        colorScheme="blue"
        mb="4"
        data-cy="build-for-free-button"
        onClick={() => onSubmit()}
      >
        Build for free
      </Button>
      <Grid
        templateColumns={["1fr", `repeat(${length(LIST)}, 1fr)`]}
        gap="2"
        mb="16"
      >
        {map(
          (item) => (
            <Flex key={item.text} alignItems="center">
              <FiCheck style={{ marginRight: "0.5rem" }} />
              <Text mr="2">{item.text}</Text>
            </Flex>
          ),
          LIST
        )}
      </Grid>
      <Box display={["none", "block"]} width="full">
        <Box maxW="sm">
          <Poser20 />
        </Box>
      </Box>
    </Center>
  );
}

export default Footer;
