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
      mb={10}
      color="#717171"
      fontWeight={700}
      letterSpacing={1}
      textTransform="uppercase"
    >
      {children}
    </Text>
  );
}

function Berlin(props: props) {
  const { isPdf, design, fields } = props;
  const { about, section } = fields;

  function renderDate(item: { startDate: string; endDate: string }) {
    if (and(isEmpty(item.startDate), isEmpty(item.endDate))) {
      return null;
    }
    if (isEmpty(item.startDate)) {
      return ` | ${item.endDate}`;
    }
    if (isEmpty(item.endDate)) {
      return ` | ${item.startDate}`;
    }
    return ` | ${item.startDate} - ${item.endDate}`;
  }

  function renderWebsite() {
    if (isEmpty(about.website)) {
      return null;
    }
    return (
      <>
        {" "}
        | <Link href={about.website}>{utils.getUrlHost(about.website)}</Link>
      </>
    );
  }

  function renderInitials() {
    if (and(about.firstName, about.lastName)) {
      return (
        <Box
          pt={5}
          pl={8}
          pr={8}
          pb={5}
          top={20}
          left={20}
          color="#FFF"
          fontWeight={400}
          bgColor="#FD5C63"
          position="absolute"
          textTransform="uppercase"
        >
          <Text>{about.firstName[0]}</Text>
          <Text>{about.lastName[0]}</Text>
        </Box>
      );
    }
    return null;
  }

  return (
    <TemplateContext.Provider value={{ isPdf, spacing: design.spacing }}>
      <Page id={Template.berlin} pt={40} pr={80} pb={40} pl={80}>
        {renderInitials()}
        <Box mb={16}>
          <Text
            mb={20}
            fontSize="2xl"
            fontWeight={700}
            textTransform="uppercase"
          >
            {about.firstName} {about.lastName}
          </Text>
          <Text mb={10}>{about.title}</Text>
          <Text mb={10} color="#717171">
            {about.city}, {about.country}
            {renderWebsite()} | {about.email} | {about.phone}
          </Text>
          {about.summary.split("\n").map((item, index) => (
            <Text key={index} color="#717171" lineHeight={1.4}>
              {item}
            </Text>
          ))}
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
                        <Text
                          mb={8}
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
                        <Text mb={8} color="#717171">
                          {isEmpty(item.subtitle) ? "" : item.subtitle}
                          {isEmpty(item.city) ? "" : ` | ${item.city}`}
                          {renderDate(item)}
                        </Text>
                        {item.description.split("\n").map((item, index) => (
                          <Text key={index} lineHeight={1.4}>
                            {item}
                          </Text>
                        ))}
                      </Box>
                    );
                  })}
                </React.Fragment>
              );
            }
            return (
              <React.Fragment key={index}>
                <SectionLabel>{sectionItem.label}</SectionLabel>
                <Flex mb={16} flexWrap="wrap">
                  {isEmpty(sectionItem.tags)
                    ? null
                    : split("\n", sectionItem.tags).map((item, index) => (
                        <Text
                          key={index}
                          mr={4}
                          mb={4}
                          pt={6}
                          pb={6}
                          pl={12}
                          pr={12}
                          bgColor="#F7F7F7"
                        >
                          {item}
                        </Text>
                      ))}
                </Flex>
              </React.Fragment>
            );
          })}
        </Box>
      </Page>
    </TemplateContext.Provider>
  );
}

export default Berlin;
