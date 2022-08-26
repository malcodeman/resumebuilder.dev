import Link from "next/link";
import {
  Heading,
  Button,
  Grid,
  Box,
  Text,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { map } from "ramda";
import { ArrowRight } from "react-feather";
import { motion } from "framer-motion";

import { TEMPLATES_LIST } from "../../lib/constants";

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
            <Box key={item.template}>
              <Image
                src={item.src}
                alt=""
                mb="2"
                borderRadius="lg"
                boxShadow={boxShadow}
              />
              <Flex mb="2" alignItems="center" justifyContent="space-between">
                <Heading fontSize="md">{item.title}</Heading>
                <Button
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  colorScheme="blue"
                  size="sm"
                  cursor="pointer"
                  onClick={() => onSubmit({ template: item.template })}
                >
                  Use template
                </Button>
              </Flex>
            </Box>
          ),
          TEMPLATES_LIST
        )}
      </Grid>
    </Box>
  );
}

export default Templates;
