import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  FormErrorMessage,
  Button,
  useBoolean,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import parser from "lib/parser";
import { Fields } from "types";

type props = {
  onImport: (fields: Fields) => void;
};

function ImportFromGithub(props: props) {
  const { onImport } = props;
  const t = useTranslations();
  const form = useForm({
    defaultValues: { username: "" },
    resolver: yupResolver(
      yup.object({
        username: yup.string().required(t("username_is_required")),
      })
    ),
  });
  const [isLoading, setIsLoading] = useBoolean();

  async function onSubmit(values: { username: string }) {
    try {
      setIsLoading.on();
      const username = values.username;
      const user = await axios.get(`https://api.github.com/users/${username}`);
      const repos = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      const fields = parser.parseGithub({ user: user.data, repos: repos.data });
      onImport(fields);
    } catch (error) {
      form.setError("username", { message: error.response.data.message });
    } finally {
      setIsLoading.off();
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormControl mb="4" isInvalid={Boolean(form.formState.errors.username)}>
        <FormLabel>URL</FormLabel>
        <InputGroup size="sm">
          <InputLeftAddon borderRadius="md">github.com/</InputLeftAddon>
          <Input
            variant="filled"
            borderRadius="md"
            data-cy="import-github-username"
            {...form.register("username")}
          />
        </InputGroup>
        <FormErrorMessage>
          {form.formState.errors.username?.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        isLoading={isLoading}
        size="sm"
        colorScheme="blue"
        type="submit"
        data-cy="import-github-submit"
      >
        {t("import")}
      </Button>
    </form>
  );
}

export default ImportFromGithub;
