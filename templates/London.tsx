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
    <Flex mb={8}>
      <Text
        padding={4}
        color="#FFF"
        bgColor="#000"
        fontWeight={700}
        letterSpacing={1}
        textTransform="uppercase"
      >
        {children}
      </Text>
    </Flex>
  );
}

function London(props: props) {
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
      <Page id={Template.london}>
        <Flex
          mb={16}
          pt={16}
          pr={80}
          pb={16}
          pl={80}
          bgColor="#FFBB00"
          justifyContent="space-between"
        >
          <Box
            mr={16}
            fontSize="3xl"
            fontWeight={700}
            textTransform="uppercase"
          >
            <Text>{about.firstName}</Text>
            <Text>{about.lastName}</Text>
          </Box>
          <Box>
            <Text mb={4}>
              {about.city} {about.country}
            </Text>
            <Text mb={4}>{about.phone}</Text>
            <Text mb={4}>{about.email}</Text>
            <Link href={about.website}>{utils.getUrlHost(about.website)}</Link>
          </Box>
        </Flex>
        <Box pr={80} pl={80}>
          {renderProfile()}
          {section.map((sectionItem, index) => {
            if (utils.isStandardSection(sectionItem.name)) {
              return (
                <Box key={index}>
                  <SectionLabel>{sectionItem.label}</SectionLabel>
                  {sectionItem.nested.map((item, index) => {
                    return (
                      <Box key={index} mb={16}>
                        <Text mb={4} fontSize="sm" fontWeight={700}>
                          {item.subtitle},{" "}
                          {item.website ? (
                            <Link href={item.website}>{item.title}</Link>
                          ) : (
                            item.title
                          )}
                          {isEmpty(item.city) ? null : `, ${item.city}`}
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
              </Box>
            );
          })}
        </Box>
      </Page>
    </TemplateContext.Provider>
  );
}

export default London;
