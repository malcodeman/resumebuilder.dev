import React from "react";
import { and, isEmpty, split, or } from "ramda";

import utils from "../lib/utils";

import Text from "./components/Text";
import Page from "./components/Page";
import Box from "./components/Box";
import Flex from "./components/Flex";
import Link from "./components/Link";
import Image from "./components/Image";
import TemplateContext from "./components/TemplateContext";

import { TemplateProps } from "../types";

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

function Berlin(props: TemplateProps) {
  const {
    isPdf = false,
    hideSensitiveData = false,
    design,
    fields,
    profilePicture,
  } = props;
  const { about, section } = fields;

  function renderProfilePictureOrInitials() {
    if (profilePicture) {
      return (
        <Image
          alt=""
          top={20}
          left={20}
          width={36}
          height={36}
          objectFit="cover"
          position="absolute"
          borderRadius="100%"
          src={profilePicture}
        />
      );
    }
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

  function renderLocation() {
    if (and(isEmpty(about.city), isEmpty(about.country))) {
      return null;
    }
    if (isEmpty(about.city)) {
      return `${about.country} | `;
    }
    if (isEmpty(about.country)) {
      return `${about.city} | `;
    }
    return `${about.city}, ${about.country} | `;
  }

  function renderWebsite() {
    if (isEmpty(about.website)) {
      return null;
    }
    return (
      <>
        <Link href={about.website}>{utils.getUrlHost(about.website)}</Link> |{" "}
      </>
    );
  }

  function renderEmail() {
    if (or(isEmpty(about.email), hideSensitiveData)) {
      return null;
    }

    if (isEmpty(about.phone)) {
      return about.email;
    }

    return `${about.email} | `;
  }

  function renderSummary(summary: string) {
    if (isEmpty(summary)) {
      return null;
    }
    return split("\n", summary).map((item, index) => (
      <Text key={index} color="#717171" lineHeight={1.4}>
        {item}
      </Text>
    ));
  }

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
            bgColor="#F7F7F7"
          >
            {item}
          </Text>
        ))}
      </Flex>
    );
  }

  return (
    <TemplateContext.Provider value={{ isPdf, spacing: design.spacing }}>
      <Page id="berlin" pt={40} pr={80} pb={40} pl={80}>
        {renderProfilePictureOrInitials()}
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
            {renderLocation()}
            {renderWebsite()}
            {renderEmail()}
            {hideSensitiveData ? null : about.phone}
          </Text>
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

export default Berlin;
