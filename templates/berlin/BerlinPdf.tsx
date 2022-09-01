import {
  Font,
  StyleSheet,
  Document,
  Page,
  View,
  Text,
  Link,
} from "@react-pdf/renderer";
import { isEmpty, and, split } from "ramda";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Me5Q.ttf",
});

import utils from "../../lib/utils";
import theme from "../theme";

import { Design, Fields } from "../../types";

type props = {
  design: Design;
  fields: Fields;
};

function BerlinPdf(props: props) {
  const { design, fields } = props;
  const { about, section } = fields;
  const styles = StyleSheet.create({
    page: {
      width: "100%",
      lineHeight: 1,
      height: "100%",
      color: "#323336",
      position: "relative",
      fontFamily: "Roboto",
      backgroundColor: "#fff",
      fontSize: theme.fontSize.xs * design.spacing,
      paddingTop: 40 * design.spacing,
      paddingRight: 80 * design.spacing,
      paddingBottom: 40 * design.spacing,
      paddingLeft: 80 * design.spacing,
    },
    initials: {
      position: "absolute",
      color: "#000",
      textTransform: "uppercase",
      backgroundColor: "#43f398",
      fontWeight: 400,
      left: 20 * design.spacing,
      top: 20 * design.spacing,
      paddingTop: 5 * design.spacing,
      paddingLeft: 8 * design.spacing,
      paddingRight: 8 * design.spacing,
      paddingBottom: 5 * design.spacing,
    },
    header: {
      marginBottom: 16 * design.spacing,
    },
    name: {
      fontSize: theme.fontSize["2xl"] * design.spacing,
      marginBottom: 20 * design.spacing,
      textTransform: "uppercase",
      fontWeight: 700,
    },
    title: {
      marginBottom: 10 * design.spacing,
    },
    details: {
      color: "#707678",
      marginBottom: 10 * design.spacing,
    },
    summary: {
      lineHeight: 1.4,
      color: "#707678",
    },
    sectionLabel: {
      color: "#707678",
      textTransform: "uppercase",
      marginBottom: 10 * design.spacing,
      letterSpacing: 1 * design.spacing,
      fontWeight: 700,
    },
    sectionItem: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 16 * design.spacing,
    },
    sectionTitle: {
      textTransform: "uppercase",
      fontSize: theme.fontSize.sm * design.spacing,
      letterSpacing: 0.06 * design.spacing,
      fontWeight: 700,
      marginBottom: 8 * design.spacing,
    },
    subtitle: {
      color: "#707678",
      marginBottom: 8 * design.spacing,
    },
    description: {
      lineHeight: 1.4,
    },
    list: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 16 * design.spacing,
    },
    listItem: {
      backgroundColor: "#f1f5f7",
      marginRight: 4 * design.spacing,
      marginBottom: 4 * design.spacing,
      paddingLeft: 12 * design.spacing,
      paddingTop: 6 * design.spacing,
      paddingRight: 12 * design.spacing,
      paddingBottom: 6 * design.spacing,
    },
  });

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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.initials}>
          <Text>{about.firstName[0] || "f"}</Text>
          <Text>{about.lastName[0] || "l"}</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.name}>
            {about.firstName || "first name"} {about.lastName || "last name"}
          </Text>
          <Text style={styles.title}>{about.title || "title"}</Text>
          <Text style={styles.details}>
            {about.city || "city"}, {about.country || "country"} |{" "}
            <Link src={about.website}>{utils.getUrlHost(about.website)}</Link> |{" "}
            {about.email || "email"} | {about.phone || "phone"}
          </Text>
          {about.summary.split("\n").map((item, index) => (
            <Text key={index} style={styles.summary}>
              {item || "summary"}
            </Text>
          ))}
        </View>
        {section.map((sectionItem, index) => {
          if (utils.isStandardSection(sectionItem.name)) {
            return (
              <View key={index}>
                <Text style={styles.sectionLabel}>
                  {sectionItem.label || "label"}
                </Text>
                {sectionItem.nested.map((item, index) => {
                  return (
                    <View key={index} style={styles.sectionItem}>
                      <Text style={styles.sectionTitle}>
                        {item.website ? (
                          <Link src={item.website}>
                            {item.title || "Untitled"}
                          </Link>
                        ) : (
                          item.title || "Untitled"
                        )}
                      </Text>
                      <Text style={styles.subtitle}>
                        {isEmpty(item.subtitle) ? "" : item.subtitle}
                        {isEmpty(item.city) ? "" : ` | ${item.city}`}
                        {renderDate(item)}
                      </Text>
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
                        {item}
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

export default BerlinPdf;
