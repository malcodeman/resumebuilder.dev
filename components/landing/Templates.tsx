import Link from "next/link";
import {
  Heading,
  Button,
  Grid,
  Box,
  Text,
  Flex,
  Center,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { map, toUpper } from "ramda";
import { ArrowRight } from "react-feather";
import { motion } from "framer-motion";

import { LANDING_RESUMES_LIST } from "../../lib/constants";
import getTemplate from "../../lib/getTemplate";

import { Template } from "../../types";

const ARROW_RIGHT_VARIANTS = {
  mouseenter: { x: 5 },
  mouseleave: { x: 0 },
};

type props = {
  onSubmit: (data: { template: Template }) => void;
};

function Templates(props: props) {
  const { onSubmit } = props;
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );
  const spacing = useBreakpointValue({ base: 0.6, md: 0.8 });
  return (
    <Box as="section">
      <Box width={["100%", "100%", "50%"]}>
        <Heading mb="4">Start with a template.</Heading>
        <Text mb="4">
          Choose from any of our free templates that best fit your personal
          style and professional needs.
        </Text>
        <Link href="/templates" passHref>
          <Button
            as={motion.button}
            whileHover="mouseenter"
            variant="outline"
            mb="8"
            data-cy="see-all-templates"
            rightIcon={
              <motion.div variants={ARROW_RIGHT_VARIANTS}>
                <ArrowRight size={20} />
              </motion.div>
            }
          >
            See all templates
          </Button>
        </Link>
      </Box>
      <Grid
        templateColumns={[
          "minmax(0, 1fr)",
          "repeat(2, minmax(0, 1fr))",
          "repeat(3, minmax(0, 1fr))",
        ]}
        gap="8"
      >
        {map(
          (item) => (
            <Flex
              key={item.id}
              as={motion.div}
              whileHover={{ scale: 1.1 }}
              flexDirection="column"
              role="group"
            >
              <Box
                mb="2"
                height="360px"
                overflow="hidden"
                userSelect="none"
                borderRadius="lg"
                position="relative"
                boxShadow={boxShadow}
                _hover={{ cursor: "pointer" }}
              >
                {getTemplate(
                  {
                    ...item.design,
                    spacing: spacing || item.design.spacing,
                  },
                  {
                    about: item.about,
                    section: item.section,
                  }
                )}
                <Center
                  as={motion.div}
                  whileHover={{ opacity: 1 }}
                  position="absolute"
                  left="0"
                  top="0"
                  right="0"
                  bottom="0"
                  opacity="0"
                  backgroundColor="rgba(0, 0, 0, 0.05)"
                >
                  <Button
                    colorScheme="blue"
                    onClick={() => onSubmit({ template: item.design.template })}
                  >
                    Use template
                  </Button>
                </Center>
              </Box>
              <Text>{toUpper(item.design.template)}</Text>
            </Flex>
          ),
          LANDING_RESUMES_LIST
        )}
      </Grid>
    </Box>
  );
}

export default Templates;
