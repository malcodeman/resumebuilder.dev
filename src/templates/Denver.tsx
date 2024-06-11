import React from "react";
import { and, equals, isEmpty, or, split } from "ramda";
import { utils } from "lib/utils";
import {
  Box,
  Flex,
  Link,
  Page,
  TemplateContext,
  Text,
} from "templates/components";
import { TemplateProps } from "types";

function SectionLabel(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Text
      mb={10}
      color="#032221"
      fontWeight={700}
      letterSpacing={1}
      fontSize="lg"
    >
      {children}
    </Text>
  );
}

function Denver(props: TemplateProps) {
  const {
    isPdf = false,
    isDescendantOfLink = false,
    hideSensitiveData = false,
    design,
    fields,
  } = props;
  const { about, section } = fields;

  function renderEmail() {
    if (or(isEmpty(about.email), hideSensitiveData)) {
      return null;
    }
    if (isEmpty(about.phone)) {
      return about.email;
    }
    return `${about.email} • `;
  }

  function renderWebsite() {
    if (isEmpty(about.website)) {
      return null;
    }
    return (
      <>
        <Link href={about.website} color="#F1F7F6">
          {utils.parseWebsite(about.website)}
        </Link>{" "}
        •{" "}
      </>
    );
  }

  function renderLocation() {
    if (and(isEmpty(about.city), isEmpty(about.country))) {
      return null;
    }
    if (isEmpty(about.city)) {
      return about.country;
    }
    if (isEmpty(about.country)) {
      return about.city;
    }
    return `${about.city}, ${about.country}`;
  }

  function renderSummary(summary: string) {
    if (isEmpty(summary)) {
      return null;
    }
    return split("\n", summary).map((item, index) => (
      <Text key={index} lineHeight={1.4} mb={16}>
        {item}
      </Text>
    ));
  }

  function renderDate(item: { startDate: string; endDate: string }) {
    if (and(isEmpty(item.startDate), isEmpty(item.endDate))) {
      return null;
    }
    if (isEmpty(item.startDate)) {
      return ` - ${item.endDate}`;
    }
    if (isEmpty(item.endDate)) {
      return `${item.startDate} -`;
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
          <Text
            key={index}
            mr={4}
            mb={4}
            pt={6}
            pb={6}
            pl={12}
            pr={12}
            bgColor="#03624C"
            color="#FFF"
            borderRadius={16}
          >
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
      <Page id="denver" display="flex" flexDirection="column">
        <Flex
          bgColor="#014E3C"
          padding={16}
          justifyContent="space-between"
          alignItems="flex-end"
          height="10%"
          color="#F1F7F6"
        >
          <Text fontSize="3xl" fontWeight={700}>
            {about.firstName} {about.lastName}
          </Text>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text mb={4}>
              {renderEmail()}
              {hideSensitiveData ? null : about.phone}
            </Text>
            <Text>
              {renderWebsite()}
              {renderLocation()}
            </Text>
          </Flex>
        </Flex>
        <Box padding={16} flexGrow={1} bgColor="#E7F2F1" color="#032221">
          <Text mb={4} fontSize="md" fontWeight={700}>
            {about.title}
          </Text>
          {renderSummary(about.summary)}
          {section.map((sectionItem, index) => {
            if (utils.isStandardSection(sectionItem.name)) {
              return (
                <React.Fragment key={index}>
                  <SectionLabel>{sectionItem.label}</SectionLabel>
                  {sectionItem.nested.map((item, index) => {
                    return (
                      <Box key={index} mb={16}>
                        <Flex justifyContent="space-between" color="#032221">
                          <Text mb={8} fontSize="sm" fontWeight={700}>
                            {item.subtitle}
                            {equals(sectionItem.name, "employment")
                              ? " at "
                              : ", "}
                            {item.website ? (
                              <Link href={item.website} color="#032221">
                                {item.title}
                              </Link>
                            ) : (
                              item.title
                            )}
                            {isEmpty(item.city) ? null : `, ${item.city}`}
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

export { Denver };
