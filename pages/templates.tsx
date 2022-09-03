import React from "react";
import { Grid, Text, ButtonGroup, Button } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { includes, map, filter, length, toLower, isEmpty, equals } from "ramda";

import Layout from "../components/Layout";

import {
  DEFAULT_VALUES,
  TEMPLATES_LIST,
  TEMPLATES_FILTERS,
} from "../lib/constants";

import { Template as TemplateType } from "../types";

import SearchInput from "../components/misc/SearchInput";
import Template from "../components/templates/Template";

import useResumes from "../hooks/useResumes";

function Templates() {
  const router = useRouter();
  const { createNew } = useResumes();
  const [activeFilter, setActiveFilter] = React.useState(
    TEMPLATES_FILTERS[0].value
  );
  const [template, setTemplate] = React.useState("");
  const filteredTemplatesByTags = filter(
    (item) => includes(activeFilter, item.tags),
    TEMPLATES_LIST
  );
  const filteredTemplatesBySearch = filter(
    (item) => includes(toLower(template), toLower(item.title)),
    filteredTemplatesByTags
  );

  function handleOnUseTemplate(template: TemplateType) {
    const design = {
      ...DEFAULT_VALUES.design,
      template,
    };
    const resume = createNew({ design });
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <>
      <Head>
        <title>Templates - resumebuildedev</title>
      </Head>
      <Layout>
        <SearchInput
          mb="4"
          value={template}
          placeholder={`Search ${length(filteredTemplatesByTags)} templates...`}
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
                {item.label}
              </Button>
            ),
            TEMPLATES_FILTERS
          )}
        </ButtonGroup>
        {isEmpty(filteredTemplatesBySearch) ? (
          <Text>No templates found</Text>
        ) : (
          <></>
        )}
        <Grid
          gap="8"
          gridTemplateColumns="repeat(auto-fill, minmax(288px, 1fr))"
          data-cy="templates-grid"
        >
          {map(
            (item) => (
              <Template
                key={item.template}
                id={item.template}
                onUseTemplate={(template) => handleOnUseTemplate(template)}
              />
            ),
            filteredTemplatesBySearch
          )}
        </Grid>
      </Layout>
    </>
  );
}

export default Templates;
