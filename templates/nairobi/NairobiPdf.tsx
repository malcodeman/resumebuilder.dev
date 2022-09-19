import {
  Font,
  Page,
  View,
  Text,
  Link,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { and, isEmpty } from "ramda";

import utils from "../../lib/utils";
import theme from "../theme";

import { Design, Fields } from "../../types";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Me5Q.ttf" },
    {
      src: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlvAw.ttf",
      fontWeight: 700,
    },
  ],
});

type props = {
  design: Design;
  fields: Fields;
};

function NairobiPdf(props: props) {
  const { design, fields } = props;
  const { about, section } = fields;
  const styles = StyleSheet.create({
    page: {
      width: "100%",
      lineHeight: 1,
      height: "100%",
      color: "#323336",
      fontFamily: "Roboto",
      backgroundColor: "#fff",
      overflowWrap: "break-word",
      fontSize: theme.fontSize.xs * design.spacing,
    },
    header: {
      marginBottom: 40 * design.spacing,
    },
    name: {
      fontWeight: 700,
      marginBottom: 4 * design.spacing,
      fontSize: theme.fontSize["2xl"] * design.spacing,
    },
    text: {
      marginBottom: 4 * design.spacing,
    },
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
    },
    leftColumn: {
      width: "75%",
      paddingTop: 40 * design.spacing,
      paddingLeft: 20 * design.spacing,
      paddingRight: 20 * design.spacing,
      paddingBottom: 40 * design.spacing,
    },
    rightColumn: {
      width: "25%",
      color: "#fff",
      backgroundColor: "#00205b",
      paddingLeft: 20 * design.spacing,
      paddingRight: 20 * design.spacing,
      paddingBottom: 20 * design.spacing,
      paddingTop:
        (40 + theme.fontSize["2xl"] + 4 + theme.fontSize.xs + 40) *
        design.spacing,
    },
    profile: {
      marginBottom: 16 * design.spacing,
    },
    sectionLabel: {
      fontWeight: 700,
      marginBottom: 10 * design.spacing,
      fontSize: theme.fontSize.md * design.spacing,
    },
    summary: {
      lineHeight: 1.4,
    },
    sectionItem: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 16 * design.spacing,
    },
    sectionTitle: {
      fontWeight: 700,
      marginBottom: 8 * design.spacing,
      fontSize: theme.fontSize.sm * design.spacing,
    },
    date: {
      color: "#707678",
      marginBottom: 8 * design.spacing,
    },
    description: {
      lineHeight: 1.4,
    },
    list: {
      marginBottom: 16 * design.spacing,
    },
    listItem: {
      marginBottom: 8 * design.spacing,
    },
  });

  function renderDate(item: { startDate: string; endDate: string }) {
    if (and(isEmpty(item.startDate), isEmpty(item.endDate))) {
      return null;
    }
    return (
      <Text style={styles.date}>
        {item.startDate} - {item.endDate}
      </Text>
    );
  }

  function renderProfile() {
    if (isEmpty(about.summary)) {
      return null;
    }
    return (
      <View style={styles.profile}>
        <Text style={styles.sectionLabel}>Profile</Text>
        {about.summary.split("\n").map((item, index) => (
          <Text key={index} style={styles.summary}>
            {item}
          </Text>
        ))}
      </View>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <View style={styles.header}>
              <Text style={styles.name}>
                {about.firstName} {about.lastName}
              </Text>
              <Text>{about.title}</Text>
            </View>
            {renderProfile()}
            {section.map((sectionItem, index) => {
              if (utils.isStandardSection(sectionItem.name)) {
                return (
                  <View key={index}>
                    <Text style={styles.sectionLabel}>{sectionItem.label}</Text>
                    {sectionItem.nested.map((item, index) => {
                      return (
                        <View key={index} style={styles.sectionItem}>
                          <Text style={styles.sectionTitle}>
                            {item.subtitle},{" "}
                            {item.website ? (
                              <Link src={item.website}>{item.title}</Link>
                            ) : (
                              item.title
                            )}
                            , {item.city}
                          </Text>
                          {renderDate(item)}
                          {item.description.split("\n").map((item, index) => (
                            <Text key={index} style={styles.description}>
                              {item}
                            </Text>
                          ))}
                        </View>
                      );
                    })}
                  </View>
                );
              }
            })}
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.list}>
              <Text style={styles.sectionLabel}>Details</Text>
              <Text style={styles.text}>{about.city} </Text>
              <Text style={styles.text}>{about.country}</Text>
              <Text style={styles.text}>{about.phone}</Text>
              <Text style={styles.text}>{about.email}</Text>
              <Link style={styles.text} src={about.website}>
                {utils.getUrlHost(about.website)}
              </Link>
            </View>
            {section.map((sectionItem, index) => {
              if (utils.isTagListSection(sectionItem.name)) {
                return (
                  <View key={index} style={styles.list}>
                    <Text style={styles.sectionLabel}>{sectionItem.label}</Text>
                    {sectionItem.tags?.split("\n").map((item, index) => {
                      return (
                        <Text key={index} style={styles.listItem}>
                          {item}
                        </Text>
                      );
                    })}
                  </View>
                );
              }
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default NairobiPdf;
