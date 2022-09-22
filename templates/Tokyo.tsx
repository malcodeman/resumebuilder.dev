import React from "react";
import { and, isEmpty, equals } from "ramda";

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
    <Text mb={10} fontWeight={700} textTransform="uppercase">
      {children}
    </Text>
  );
}

function Tokyo(props: props) {
  const { isPdf, design, fields } = props;
  const { about, section } = fields;

  function renderProfile() {
    if (isEmpty(about.summary)) {
      return null;
    }
    return (
      <Box mb={16}>
        <SectionLabel>Profile</SectionLabel>
        {about.summary.split("\n").map((item, index) => (
          <Text key={index} lineHeight={1.4}>
            {item}
          </Text>
        ))}
      </Box>
    );
  }

  function renderDate(item: { startDate: string; endDate: string }) {
    if (and(isEmpty(item.startDate), isEmpty(item.endDate))) {
      return null;
    }
    return (
      <Text mb={8} color="#707678">
        {item.startDate} - {item.endDate}
      </Text>
    );
  }

  return (
    <TemplateContext.Provider value={{ isPdf, spacing: design.spacing }}>
      <Page id={Template.tokyo} pt={20} pr={40} pb={20} pl={40}>
        <Box mb={40} textAlign="center" textTransform="uppercase">
          <Text
            mb={20}
            fontSize="2xl"
            fontWeight={700}
            textTransform="uppercase"
          >
            {about.firstName} {about.lastName}
          </Text>
          <Text>
            {about.title} {about.city}, {about.country} {about.phone}
          </Text>
        </Box>
        <Flex>
          <Box pr={20} width="25%" textAlign="center">
            <Box mb={16}>
              <SectionLabel>Details</SectionLabel>
              <Text mb={4}>{about.city}</Text>
              <Text mb={4}>{about.country}</Text>
              <Text mb={4}>{about.phone}</Text>
              <Text mb={4}>{about.email}</Text>
              <Link mb={4} href={about.website}>
                {utils.getUrlHost(about.website)}
              </Link>
            </Box>
            {section.map((sectionItem, index) => {
              if (utils.isTagListSection(sectionItem.name)) {
                return (
                  <Box key={index} mb={16}>
                    <SectionLabel>{sectionItem.label}</SectionLabel>
                    {sectionItem.tags?.split("\n").map((item, index) => {
                      return (
                        <Text key={index} mb={8}>
                          {item}
                        </Text>
                      );
                    })}
                  </Box>
                );
              }
            })}
          </Box>
          <Box width="75%">
            {renderProfile()}
            {section.map((sectionItem, index) => {
              if (utils.isStandardSection(sectionItem.name)) {
                return (
                  <React.Fragment key={index}>
                    <SectionLabel>{sectionItem.label}</SectionLabel>
                    {sectionItem.nested.map((item, index) => {
                      return (
                        <Box key={index} mb={16}>
                          <Text mb={8} fontSize="sm" fontWeight={700}>
                            {item.subtitle}
                            {equals(sectionItem.name, "employment")
                              ? " at "
                              : ", "}
                            {item.website ? (
                              <Link href={item.website}>{item.title}</Link>
                            ) : (
                              item.title
                            )}
                            , {item.city}
                          </Text>
                          {renderDate(item)}
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
            })}
          </Box>
        </Flex>
      </Page>
    </TemplateContext.Provider>
  );
}

export default Tokyo;
