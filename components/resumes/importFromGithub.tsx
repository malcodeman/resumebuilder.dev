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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiLink } from "react-icons/fi";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import parser from "../../lib/parser";

import { Fields } from "../../types";

type props = {
  onImport: (fields: Fields) => void;
};

function ImportFromGithub(props: props) {
  const { onImport } = props;
  const form = useForm({
    defaultValues: { username: "" },
    resolver: yupResolver(
      yup.object({
        username: yup.string().required("Username is required"),
      })
    ),
  });
  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(values: { username: string }) {
    try {
      setIsLoading(true);
      const username = values.username;
      const user = await axios.get(`https://api.github.com/users/${username}`);
      const repos = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      const fields = parser.parseGithub({ user: user.data, repos: repos.data });
      onImport(fields);
    } catch (err) {
      form.setError("username", { message: err.response.data.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(form.formState.errors.username)}>
        <FormLabel>Url</FormLabel>
        <InputGroup size="sm">
          <InputLeftAddon borderRadius="md">github.com/</InputLeftAddon>
          <Input
            variant="filled"
            borderRadius="md"
            data-cy="import-github-username"
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
                data-cy="import-github-submit"
                icon={<FiLink />}
              />
            )}
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {form.formState.errors.username?.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
}

export default ImportFromGithub;
