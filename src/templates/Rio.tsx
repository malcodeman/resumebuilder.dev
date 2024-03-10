import React from "react";
import { and, isEmpty, split } from "ramda";
import utils from "lib/utils";
import Text from "templates/components/Text";
import Page from "templates/components/Page";
import Box from "templates/components/Box";
import Flex from "templates/components/Flex";
import Link from "templates/components/Link";
import TemplateContext from "templates/components/TemplateContext";
import { TemplateProps } from "types";

function SectionLabel(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Text
      pb={4}
      mb={10}
      fontWeight={700}
      letterSpacing={1}
      borderBottomWidth={1}
      textTransform="uppercase"
      borderBottomStyle="solid"
      borderBottomColor="#323336"
    >
      {children}
    </Text>
  );
}

function Rio(props: TemplateProps) {
  const {
    isPdf = false,
    isDescendantOfLink = false,
    hideSensitiveData = false,
    design,
    fields,
  } = props;
  const { about, section } = fields;

  function renderSummary(summary: string) {
    if (isEmpty(summary)) {
      return null;
    }
    return split("\n", summary).map((item, index) => (
      <Text key={index} lineHeight={1.4}>
        {item}
      </Text>
    ));
  }

  function renderDate(item: { startDate: string; endDate: string }) {
    if (and(isEmpty(item.startDate), isEmpty(item.endDate))) {
      return null;
    }
    if (isEmpty(item.startDate)) {
      return item.endDate;
    }
    if (isEmpty(item.endDate)) {
      return item.startDate;
    }
    return `${item.startDate} - ${item.endDate}`;
  }

  function renderDescription(description: string) {
    if (isEmpty(description)) {
      return null;
    }
    return split("\n", description).map((item, index) => (
      <Text key={index} lineHeight={1.4}>
        {item}
      </Text>
    ));
  }

  function renderTags(tags: string) {
    if (isEmpty(tags)) {
      return null;
    }
    return (
      <Flex mb={16} flexWrap="wrap">
        {split("\n", tags).map((item, index) => (
          <Text key={index} mr={4} mb={4}>
            {item}
          </Text>
        ))}
      </Flex>
    );
  }

  return (
    <TemplateContext.Provider
      value={{ isPdf, isDescendantOfLink, spacing: design.spacing }}
    >
      <Page id="rio" pt={20} pr={40} pb={20} pl={40}>
        <Box mb={16}>
          <Flex mb={16} alignItems="center" justifyContent="space-between">
            <Box>
              <Text>{about.city}</Text>
              <Text>{about.country}</Text>
              <Text>{about.title}</Text>
            </Box>
            <Box>
              <Text fontSize="2xl">
                {about.firstName} {about.lastName}
              </Text>
            </Box>
            <Box>
              {hideSensitiveData ? null : <Text>{about.phone}</Text>}
              {hideSensitiveData ? null : <Text>{about.email}</Text>}
              <Link href={about.website}>
                {utils.parseWebsite(about.website)}
              </Link>
            </Box>
          </Flex>
          {renderSummary(about.summary)}
        </Box>
        <Box>
          {section.map((sectionItem, index) => {
            if (utils.isStandardSection(sectionItem.name)) {
              return (
                <React.Fragment key={index}>
                  <SectionLabel>{sectionItem.label}</SectionLabel>
                  {sectionItem.nested.map((item, index) => {
                    return (
                      <Box key={index} mb={16}>
                        <Flex
                          mb={8}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Text>
                            {isEmpty(item.subtitle) ? "" : item.subtitle}
                            {isEmpty(item.city) ? "" : ` | ${item.city}`}
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight={700}
                            letterSpacing={0.06}
                            textTransform="uppercase"
                          >
                            {item.website ? (
                              <Link href={item.website}>{item.title}</Link>
                            ) : (
                              item.title
                            )}
                          </Text>
                          <Text>{renderDate(item)}</Text>
                        </Flex>
                        {renderDescription(item.description)}
                      </Box>
                    );
                  })}
                </React.Fragment>
              );
            }
            return (
              <React.Fragment key={index}>
                <SectionLabel>{sectionItem.label}</SectionLabel>
                {renderTags(sectionItem.tags)}
              </React.Fragment>
            );
          })}
        </Box>
      </Page>
    </TemplateContext.Provider>
  );
}

export default Rio;
