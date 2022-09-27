import { Box, BoxProps, FormControl, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { map } from "ramda";
import { useRouter } from "next/router";
import { useLocalStorageValue, useMountEffect } from "@react-hookz/web";

const defaultValues = {
  language: "",
};

function LanguageSelect(props: BoxProps) {
  const { ...rest } = props;
  const { i18n } = useTranslation();
  const form = useForm({ defaultValues });
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "de", label: "Deutsch" },
  ];
  const router = useRouter();
  const [devTools] = useLocalStorageValue("devTools", false, {
    initializeWithStorageValue: false,
  });

  useMountEffect(() => {
    form.reset({ language: i18n.language });
  });

  const onSubmit = (data: { language: string }) => {
    const { pathname, asPath, query } = router;
    const nextLocale = data.language;
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  if (!devTools) {
    return null;
  }

  return (
    <Box as="form" onChange={form.handleSubmit(onSubmit)} {...rest}>
      <FormControl>
        <Select
          id="language"
          variant="filled"
          size="sm"
          borderRadius="md"
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
