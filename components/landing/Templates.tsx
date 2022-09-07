import Link from "next/link";
import { Heading, Button, Grid, Box, Text } from "@chakra-ui/react";
import { map, slice } from "ramda";
import { ArrowRight } from "react-feather";
import { motion } from "framer-motion";

import { TEMPLATES_LIST } from "../../lib/constants";

import { Template as TemplateType } from "../../types";

import Template from "../templates/Template";

const ARROW_RIGHT_VARIANTS = {
  mouseenter: { x: 5 },
  mouseleave: { x: 0 },
};

type props = {
  onSubmit: (template: TemplateType) => void;
};

function Templates(props: props) {
  const { onSubmit } = props;
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
        {slice(
          0,
          3,
          map(
            (item) => (
              <Template
                key={item.template}
                id={item.template}
                onUseTemplate={(template) => onSubmit(template)}
              />
            ),
            TEMPLATES_LIST
          )
        )}
      </Grid>
    </Box>
  );
}

export default Templates;
