import {
  Font,
  Page,
  View,
  Text,
  Link,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { and, isEmpty, split } from "ramda";

import utils from "../../lib/utils";
import theme from "../theme";

import { AboutField, Design, Fields } from "../../types";

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

function LondonPdf(props: props) {
  const { design, fields } = props;
  const { about, section } = fields;
  const styles = StyleSheet.create({
    page: {
      width: "100%",
      lineHeight: 1,
      height: "100%",
      color: "#222831",
      fontFamily: "Roboto",
      backgroundColor: "#fff",
      paddingTop: 20 * design.spacing,
      paddingLeft: 40 * design.spacing,
      paddingRight: 40 * design.spacing,
      paddingBottom: 20 * design.spacing,
      fontSize: theme.fontSize.xs * design.spacing,
    },
    header: {
      marginBottom: 40 * design.spacing,
    },
    details: {
      display: "flex",
      color: "#677180",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: 20 * design.spacing,
    },
    location: {
      display: "flex",
      flexDirection: "column",
      marginRight: 20 * design.spacing,
    },
    column: {
      display: "flex",
      flexDirection: "column",
    },
    name: {
      fontWeight: 700,
      marginBottom: 20 * design.spacing,
      fontSize: theme.fontSize["2xl"] * design.spacing,
    },
    summary: {
      color: "#677180",
      fontSize: theme.fontSize["2xl"] * design.spacing,
    },
    sectionLabel: {
      fontWeight: 700,
      color: "#00ADB5",
      marginBottom: 10 * design.spacing,
    },
    sectionItem: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 16 * design.spacing,
    },
    leftColumn: {
      width: "25%",
      color: "#586880",
      paddingRight: 20 * design.spacing,
      fontSize: theme.fontSize.sm * design.spacing,
    },
    rightColumn: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
    },
    sectionTitle: {
      fontWeight: 700,
      marginBottom: 10 * design.spacing,
      fontSize: theme.fontSize.sm * design.spacing,
    },
    sectionDescription: {
      lineHeight: 1.4,
      color: "#586880",
    },
    list: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      marginBottom: 16 * design.spacing,
    },
    listItem: {
      color: "#fff",
      backgroundColor: "#00ADB5",
      paddingTop: 6 * design.spacing,
      marginRight: 4 * design.spacing,
      marginBottom: 4 * design.spacing,
      paddingLeft: 12 * design.spacing,
      paddingRight: 12 * design.spacing,
      paddingBottom: 6 * design.spacing,
    },
  });

  function renderLocation(about: AboutField) {
    if (and(isEmpty(about.city), isEmpty(about.country))) {
      return null;
    }
    return (
      <Text>
        {about.city}, {about.country}
      </Text>
    );
  }

  function renderDate(item: { startDate: string; endDate: string }) {
    if (and(isEmpty(item.startDate), isEmpty(item.endDate))) {
      return null;
    }
    return (
      <Text>
        {item.startDate} - {item.endDate}
      </Text>
    );
  }

  function renderTitle(item: {
    title: string;
    subtitle: string;
    website: string;
    city: string;
    startDate: string;
    endDate: string;
    description: string;
  }) {
    if (and(isEmpty(item.title), isEmpty(item.subtitle))) {
      return null;
    }
    if (isEmpty(item.website)) {
      return (
        <Text style={styles.sectionTitle}>
          {item.title}, {item.subtitle}
        </Text>
      );
    }
    return (
      <Link style={styles.sectionTitle} src={item.website}>
        {item.title}, {item.subtitle}
      </Link>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.details}>
            <View style={styles.location}>
              {renderLocation(about)}
              <Text>{about.email}</Text>
            </View>
            <View style={styles.column}>
              <Text>{about.phone}</Text>
              <Link src={about.website}>{utils.getUrlHost(about.website)}</Link>
            </View>
          </View>
          <Text style={styles.name}>
            {about.firstName} {about.lastName}
          </Text>
          {split("\n", about.summary).map((item, index) => (
            <Text key={index} style={styles.summary}>
              {item}
            </Text>
          ))}
        </View>
        <View>
          {section.map((sectionItem, index) => {
            if (utils.isStandardSection(sectionItem.name)) {
              return (
                <View key={index}>
                  <Text style={styles.sectionLabel}>{sectionItem.label}</Text>
                  {sectionItem.nested.map((item, index) => {
                    return (
                      <View key={index} style={styles.sectionItem}>
                        <View style={styles.leftColumn}>
                          {renderDate(item)}
                        </View>
                        <View style={styles.rightColumn}>
                          {renderTitle(item)}
                          {split("\n", item.description).map((item, index) => (
                            <Text key={index} style={styles.sectionDescription}>
                              {item}
                            </Text>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            }
            return (
              <View key={index}>
                <Text style={styles.sectionLabel}>{sectionItem.label}</Text>
                {isEmpty(sectionItem.tags) ? null : (
                  <View style={styles.list}>
                    {split("\n", sectionItem.tags).map((item, index) => (
                      <Text key={index} style={styles.listItem}>
                        {item}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

export default LondonPdf;
