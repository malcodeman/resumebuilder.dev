import React from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightElement,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link as IconLink } from "react-feather";

type props = {
  onSubmit: (values: { username: string }) => void;
  isLoading: boolean;
};

function ImportFromGithub(props: props) {
  const { onSubmit, isLoading } = props;
  const form = useForm({ defaultValues: { username: "" } });
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Url</FormLabel>
        <InputGroup size="sm">
          <InputLeftAddon borderRadius="md">https://github.com/</InputLeftAddon>
          <Input
            variant="filled"
            borderRadius="md"
            {...form.register("username")}
          />
          <InputRightElement>
            {isLoading ? (
              <Spinner size="xs" />
            ) : (
              <IconButton
                type="submit"
                size="xs"
                aria-label="Import"
                icon={<IconLink size={16} />}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
}

export default ImportFromGithub;
