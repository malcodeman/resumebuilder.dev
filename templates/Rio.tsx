import React from "react";
import { and, isEmpty, split } from "ramda";

import utils from "../lib/utils";

import Text from "./components/Text";
import Page from "./components/Page";
import Box from "./components/Box";
import Flex from "./components/Flex";
import Link from "./components/Link";
import TemplateContext from "./components/TemplateContext";

import { Design, Fields, Template } from "../types";

type props = {
  isPdf: boolean;
  design: Design;
  fields: Fields;
};

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

function Rio(props: props) {
  const { isPdf, design, fields } = props;
  const { about, section } = fields;

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

  return (
    <TemplateContext.Provider value={{ isPdf, spacing: design.spacing }}>
      <Page id={Template.rio} pt={20} pr={40} pb={20} pl={40}>
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
              <Text>{about.phone}</Text>
              <Text>{about.email}</Text>
              <Link href={about.website}>
                {utils.getUrlHost(about.website)}
              </Link>
            </Box>
          </Flex>
          {about.summary.split("\n").map((item, index) => (
            <Text key={index} lineHeight={1.4}>
              {item}
            </Text>
          ))}
        </Box>
        {section.map((sectionItem, index) => {
          if (utils.isStandardSection(sectionItem.name)) {
            return (
              <Box key={index}>
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
                      {item.description.split("\n").map((item, index) => (
                        <Text key={index} lineHeight={1.4}>
                          {item}
                        </Text>
                      ))}
                    </Box>
                  );
                })}
              </Box>
            );
          }
          return (
            <Box key={index}>
              <SectionLabel>{sectionItem.label}</SectionLabel>
              <Flex mb={16} flexWrap="wrap">
                {isEmpty(sectionItem.tags)
                  ? null
                  : split("\n", sectionItem.tags).map((item, index) => (
                      <Text key={index} mr={4} mb={4}>
                        {item};
                      </Text>
                    ))}
              </Flex>
            </Box>
          );
        })}
      </Page>
    </TemplateContext.Provider>
  );
}

export default Rio;
