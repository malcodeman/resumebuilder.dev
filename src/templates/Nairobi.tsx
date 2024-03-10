import React from "react";
import { and, isEmpty, split } from "ramda";
import utils from "lib/utils";
import Text from "templates/components/Text";
import Page from "templates/components/Page";
import Box from "templates/components/Box";
import Flex from "templates/components/Flex";
import Link from "templates/components/Link";
import Image from "templates/components/Image";
import TemplateContext from "templates/components/TemplateContext";
import { TemplateProps } from "types";

function SectionLabel(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Text mb={10} fontSize="md" fontWeight={700}>
      {children}
    </Text>
  );
}

function Nairobi(props: TemplateProps) {
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

  function renderDate(item: { startDate: string; endDate: string }) {
    if (and(isEmpty(item.startDate), isEmpty(item.endDate))) {
      return null;
    }
    if (isEmpty(item.startDate)) {
      return (
        <Text mb={8} color="#707678">
          {item.endDate}
        </Text>
      );
    }
    if (isEmpty(item.endDate)) {
      return (
        <Text mb={8} color="#707678">
          {item.startDate}
        </Text>
      );
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

  return (
    <TemplateContext.Provider
      value={{ isPdf, isDescendantOfLink, spacing: design.spacing }}
    >
      <Page id="nairobi">
        <Flex minHeight="100%">
          <Box pt={40} pr={20} pb={40} pl={20} width="75%">
            <Flex mb={40} alignItems="center">
              {isEmpty(profilePicture) ? null : (
                <Image
                  mr={8}
                  alt=""
                  width={48}
                  height={48}
                  objectFit="cover"
                  borderRadius="100%"
                  src={profilePicture}
                />
              )}
              <Box>
                <Text mb={4} fontSize="2xl" fontWeight={700}>
                  {about.firstName} {about.lastName}
                </Text>
                <Text>{about.title}</Text>
              </Box>
            </Flex>
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
                            {isEmpty(item.subtitle)
                              ? null
                              : `${item.subtitle}, `}
                            {item.website ? (
                              <Link href={item.website}>{item.title}</Link>
                            ) : (
                              item.title
                            )}
                            {isEmpty(item.city) ? null : `, ${item.city}`}
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
          <Box
            width="25%"
            color="#FFF"
            padding={20}
            bgColor="#00205B"
            pt={40 + 48 + 40}
          >
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
        </Flex>
      </Page>
    </TemplateContext.Provider>
  );
}

export default Nairobi;
