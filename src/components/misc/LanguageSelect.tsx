import { Box, BoxProps, FormControl, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLocale } from "next-intl";
import { map } from "ramda";
import { useRouter } from "next/navigation";
import { useMountEffect } from "@react-hookz/web";

const defaultValues = {
  language: "",
};

function LanguageSelect(props: BoxProps) {
  const { ...rest } = props;
  const language = useLocale();
  const form = useForm({ defaultValues });
  const languageOptions = [
    { value: "bs", label: "Bosanski" },
    { value: "de", label: "Deutsch" },
    { value: "en", label: "English" },
  ];
  const router = useRouter();

  useMountEffect(() => {
    form.reset({ language });
  });

  function onSubmit(data: { language: string }) {
    // const { pathname, asPath, query } = router;
    const nextLocale = data.language;
    // router.push({ pathname, query }, asPath, { locale: nextLocale });
  }

  return (
    <Box as="form" onChange={form.handleSubmit(onSubmit)} {...rest}>
      <FormControl>
        <Select
          id="language"
          variant="filled"
          size="sm"
          borderRadius="md"
          data-cy="language-select"
          {...form.register("language")}
        >
          {map(
            (item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ),
            languageOptions
          )}
        </Select>
      </FormControl>
    </Box>
  );
}

export default LanguageSelect;
