import { Flex, SimpleGrid } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { UseFormReturn } from "react-hook-form";
import * as R from "ramda";

import { TEMPLATES } from "../../lib/constants";

import { Resume } from "../../types";

type props = {
  form: UseFormReturn<Resume, object>;
};

function Templates(props: props) {
  const { form } = props;
  const templateBgColor = useColorModeValue("gray.300", "gray.600");

  return (
    <SimpleGrid templateColumns="1fr 1fr" spacing="20px">
      {R.map(
        (item) => (
          <Flex
            key={item}
            backgroundColor={templateBgColor}
            onClick={() => form.setValue("meta.template", item)}
            height="200px"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            borderRadius="lg"
            color="#999"
          >
            {item}
          </Flex>
        ),
        TEMPLATES
      )}
    </SimpleGrid>
  );
}

export default Templates;
