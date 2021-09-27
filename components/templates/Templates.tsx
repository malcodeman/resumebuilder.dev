import {
  Box,
  Radio,
  SimpleGrid,
  Image,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { UseFormReturn, useWatch } from "react-hook-form";

import { TEMPLATES_LIST } from "../../lib/constants";

import { Resume, Template } from "../../types";

function RadioCard(props: UseRadioProps & { title: string; src: string }) {
  const { src, isChecked, title } = props;
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="lg"
        boxShadow={boxShadow}
      >
        <Image src={src} alt="" borderTopRadius="lg" />
        <Radio size="sm" isChecked={isChecked} padding="2">
          {title}
        </Radio>
      </Box>
    </Box>
  );
}

type props = {
  form: UseFormReturn<Resume, object>;
};

function Templates(props: props) {
  const { form } = props;
  const template = useWatch({
    control: form.control,
    name: `meta.template`,
  });
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "template",
    defaultValue: template,
    onChange: handleOnChange,
  });
  const group = getRootProps();

  function handleOnChange(nextValue: Template) {
    form.setValue("meta.template", nextValue);
  }

  return (
    <SimpleGrid templateColumns="1fr 1fr" gap="4" {...group}>
      {TEMPLATES_LIST.map((value) => {
        const radio = getRadioProps({
          value: value.template,
        });
        return (
          <RadioCard
            {...radio}
            key={value.template}
            title={value.title}
            src={value.src}
          ></RadioCard>
        );
      })}
    </SimpleGrid>
  );
}

export default Templates;
