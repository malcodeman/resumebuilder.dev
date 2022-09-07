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

import { Design, Fields } from "../../types";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Me5Q.ttf",
});

type props = {
  design: Design;
  fields: Fields;
};

function RioPdf(props: props) {
  const { design, fields } = props;
  const { about, section } = fields;
  const styles = StyleSheet.create({
    page: {
      width: "100%",
      lineHeight: 1,
      height: "100%",
      color: "#323336",
      position: "relative",
      backgroundColor: "#fff",
      fontFamily: "Roboto",
      paddingTop: 20 * design.spacing,
      paddingLeft: 40 * design.spacing,
      paddingRight: 40 * design.spacing,
      paddingBottom: 20 * design.spacing,
      fontSize: theme.fontSize.xs * design.spacing,
    },
    header: {
      marginBottom: 16 * design.spacing,
    },
    details: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16 * design.spacing,
    },
    name: {
      fontSize: theme.fontSize["2xl"] * design.spacing,
    },
    summaryText: {
      lineHeight: 1.4,
    },
    sectionLabel: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1 * design.spacing,
      borderBottom: "1 solid #323336",
      marginBottom: 10 * design.spacing,
      paddingBottom: 4 * design.spacing,
    },
    sectionItem: {
      marginBottom: 16 * design.spacing,
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8 * design.spacing,
    },
    sectionTitle: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.06 * design.spacing,
      fontSize: theme.fontSize.sm * design.spacing,
    },
    description: {
      lineHeight: 1.4,
    },
    list: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      marginBottom: 16 * design.spacing,
    },
    listItem: {
      marginRight: 4 * design.spacing,
      marginBottom: 4 * design.spacing,
    },
  });

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
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.details}>
            <View>
              <Text>{about.city}</Text>
              <Text>{about.country}</Text>
              <Text>{about.title}</Text>
            </View>
            <View style={styles.name}>
              <Text>
                {about.firstName} {about.lastName}
              </Text>
            </View>
            <View>
              <Text>{about.phone}</Text>
              <Text>{about.email}</Text>
              <Link src={about.website}>{utils.getUrlHost(about.website)}</Link>
            </View>
          </View>
          {about.summary.split("\n").map((item, index) => (
            <Text key={index} style={styles.summaryText}>
              {item}
            </Text>
          ))}
        </View>
        {section.map((sectionItem, index) => {
          if (utils.isStandardSection(sectionItem.name)) {
            return (
              <View key={index}>
                <Text style={styles.sectionLabel}>{sectionItem.label}</Text>
                {sectionItem.nested.map((item, index) => {
                  return (
                    <View key={index} style={styles.sectionItem}>
                      <View style={styles.sectionHeader}>
                        <Text>
                          {isEmpty(item.subtitle) ? "" : item.subtitle}
                          {isEmpty(item.city) ? "" : ` | ${item.city}`}
                        </Text>
                        <Text style={styles.sectionTitle}>
                          {item.website ? (
                            <Link src={item.website}>{item.title}</Link>
                          ) : (
                            item.title
                          )}
                        </Text>
                        <Text>{renderDate(item)}</Text>
                      </View>
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
          return (
            <View key={index}>
              <Text style={styles.sectionLabel}>{sectionItem.label}</Text>
              <View style={styles.list}>
                {isEmpty(sectionItem.tags)
                  ? null
                  : split("\n", sectionItem.tags).map((item, index) => (
                      <Text key={index} style={styles.listItem}>
                        {item};
                      </Text>
                    ))}
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}

export default RioPdf;
