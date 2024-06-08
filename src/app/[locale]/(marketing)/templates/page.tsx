"use client";
import React from "react";
import { Grid, Text, ButtonGroup, Button } from "@chakra-ui/react";
import { includes, map, filter, length, toLower, isEmpty, equals } from "ramda";
import { useTranslations } from "next-intl";
import { Layout } from "components/Layout";
import { CONSTANTS } from "lib/constants";
import { Template as TemplateType } from "types";
import { SearchInput } from "components/misc/SearchInput";
import { Template } from "app/[locale]/(marketing)/_components/Template";
import { Footer } from "app/[locale]/(marketing)/_components/Footer";
import { useResumes } from "hooks/useResumes";
import { useRouter } from "navigation";

function Templates() {
  const t = useTranslations();
  const router = useRouter();
  const { createNew } = useResumes();
  const [activeFilter, setActiveFilter] = React.useState(
    CONSTANTS.TEMPLATES_FILTERS[0].value
  );
  const [template, setTemplate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<TemplateType | null>(null);
  const filteredTemplatesByTags = filter(
    (item) => includes(activeFilter, item.tags),
    CONSTANTS.TEMPLATES_LIST
  );
  const filteredTemplatesBySearch = filter(
    (item) => includes(toLower(template), toLower(item.title)),
    filteredTemplatesByTags
  );

  function handleOnUseTemplate(template: TemplateType) {
    setIsLoading(template);
    const design = {
      ...CONSTANTS.DEFAULT_VALUES.design,
      template,
    };
    const resume = createNew({ design });
    router.push(`/resumes/${resume.id}`);
    setIsLoading(null);
  }

  return (
    <Layout>
      <SearchInput
        mb="4"
        data-testid="search-input"
        value={template}
        placeholder={t("search_n_templates", {
          n: length(filteredTemplatesByTags),
        })}
        onChangeValue={(nextValue) => setTemplate(nextValue)}
        onClear={() => setTemplate("")}
      />
      <ButtonGroup size="sm" mb="4" variant="ghost">
        {map(
          (item) => (
            <Button
              key={item.value}
              isActive={equals(activeFilter, item.value)}
              data-testid={`template-filters-${item.value}`}
              onClick={() => setActiveFilter(item.value)}
            >
              {t(item.labelTransKey)}
            </Button>
          ),
          CONSTANTS.TEMPLATES_FILTERS
        )}
      </ButtonGroup>
      {isEmpty(filteredTemplatesBySearch) ? (
        <Text>{t("no_templates_found")}</Text>
      ) : (
        <></>
      )}
      <Grid
        mb="32"
        gap="8"
        gridTemplateColumns="repeat(auto-fill, minmax(288px, 1fr))"
        data-testid="templates-grid"
      >
        {map(
          (item) => (
            <Template
              key={item.template}
              id={item.template}
              isLoading={equals(isLoading, item.template)}
              onUseTemplate={(template) => handleOnUseTemplate(template)}
            />
          ),
          filteredTemplatesBySearch
        )}
      </Grid>
      <Footer />
    </Layout>
  );
}

export default Templates;
