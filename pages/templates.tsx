import React from "react";
import { Grid, Text, ButtonGroup, Button } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { includes, map, filter, length, toLower, isEmpty, equals } from "ramda";
import { useTranslations } from "next-intl";

import Layout from "../components/Layout";

import {
  DEFAULT_VALUES,
  TEMPLATES_LIST,
  TEMPLATES_FILTERS,
} from "../lib/constants";

import { Template as TemplateType } from "../types";

import SearchInput from "../components/misc/SearchInput";
import Template from "../components/templates/Template";
import Footer from "../components/misc/Footer";

import useResumes from "../hooks/useResumes";

function Templates() {
  const t = useTranslations();
  const router = useRouter();
  const { createNew } = useResumes();
  const [activeFilter, setActiveFilter] = React.useState(
    TEMPLATES_FILTERS[0].value
  );
  const [template, setTemplate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<TemplateType | null>(null);
  const filteredTemplatesByTags = filter(
    (item) => includes(activeFilter, item.tags),
    TEMPLATES_LIST
  );
  const filteredTemplatesBySearch = filter(
    (item) => includes(toLower(template), toLower(item.title)),
    filteredTemplatesByTags
  );

  async function handleOnUseTemplate(template: TemplateType) {
    setIsLoading(template);
    const design = {
      ...DEFAULT_VALUES.design,
      template,
    };
    const resume = createNew({ design });
    await router.push(`/resumes/${resume.id}`);
    setIsLoading(null);
  }

  return (
    <>
      <Head>
        <title>Templates | resumebuilder.dev</title>
      </Head>
      <Layout>
        <SearchInput
          mb="4"
          data-cy="search-input"
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
                data-cy={`template-filters-${item.value}`}
                onClick={() => setActiveFilter(item.value)}
              >
                {t(item.labelTransKey)}
              </Button>
            ),
            TEMPLATES_FILTERS
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
          data-cy="templates-grid"
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
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`../public/locales/${locale}/common.json`))
        .default,
    },
  };
}

export default Templates;
