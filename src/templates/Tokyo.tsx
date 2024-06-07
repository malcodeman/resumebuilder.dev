import React from "react";
import { and, isEmpty, equals, split } from "ramda";
import { utils } from "lib/utils";
import { Text } from "templates/components/Text";
import { Page } from "templates/components/Page";
import { Box } from "templates/components/Box";
import { Flex } from "templates/components/Flex";
import { Link } from "templates/components/Link";
import { Image } from "templates/components/Image";
import { TemplateContext } from "templates/components/TemplateContext";
import { TemplateProps } from "types";

function SectionLabel(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Text mb={10} fontWeight={700} textTransform="uppercase">
      {children}
    </Text>
  );
}

function Tokyo(props: TemplateProps) {
  const {
    isPdf = false,
    isDescendantOfLink = false,
    hideSensitiveData = false,
    design,
    fields,
    profilePicture,
  } = props;
  const { about, section } = fields;

  function renderProfile() {
    if (isEmpty(about.summary)) {
      return null;
    }
    return (
      <Box mb={16}>
        <SectionLabel>Profile</SectionLabel>
        {split("\n", about.summary).map((item, index) => (
          <Text key={index} lineHeight={1.4}>
            {item}
          </Text>
        ))}
      </Box>
    );
  }

  function renderTags(tags: string) {
    if (isEmpty(tags)) {
      return null;
    }
    return split("\n", tags).map((item, index) => (
      <Text key={index} mb={8}>
        {item}
      </Text>
    ));
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

  return (
    <TemplateContext.Provider
      value={{ isPdf, isDescendantOfLink, spacing: design.spacing }}
    >
      <Page id="tokyo" pt={20} pr={40} pb={20} pl={40}>
        {isEmpty(profilePicture) ? null : (
          <Flex mb={10} justifyContent="center">
            <Image
              alt=""
              width={48}
              height={48}
              objectFit="cover"
              borderRadius="100%"
              src={profilePicture}
            />
          </Flex>
        )}
        <Box mb={40} textAlign="center" textTransform="uppercase">
          <Text
            mb={10}
            fontSize="2xl"
            fontWeight={700}
            textTransform="uppercase"
          >
            {about.firstName} {about.lastName}
          </Text>
          <Text>
            {about.title} {about.city}, {about.country}{" "}
            {hideSensitiveData ? null : about.phone}
          </Text>
        </Box>
        <Flex>
          <Box pr={20} width="25%" textAlign="center">
            <Box mb={16}>
              <SectionLabel>Details</SectionLabel>
              <Text mb={4}>{about.city}</Text>
              <Text mb={4}>{about.country}</Text>
              {hideSensitiveData ? null : <Text mb={4}>{about.phone}</Text>}
              {hideSensitiveData ? null : <Text mb={4}>{about.email}</Text>}
              <Link mb={4} href={about.website}>
                {utils.parseWebsite(about.website)}
              </Link>
            </Box>
            {section.map((sectionItem, index) => {
              if (utils.isTagListSection(sectionItem.name)) {
                return (
                  <Box key={index} mb={16}>
                    <SectionLabel>{sectionItem.label}</SectionLabel>
                    {renderTags(sectionItem.tags)}
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
                          {renderDescription(item.description)}
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

export { Tokyo };
