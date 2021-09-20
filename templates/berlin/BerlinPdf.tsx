import {
  Font,
  StyleSheet,
  Document,
  Page,
  View,
  Text,
  Link,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Me5Q.ttf",
});

import utils from "../../lib/utils";
import theme from "../theme";

import { Fields } from "../../types";

function BerlinPdf(props: Fields) {
  const { about, section } = props;
  const styles = StyleSheet.create({
    page: {
      lineHeight: 1,
      height: "100%",
      color: "#323336",
      position: "relative",
      fontFamily: "Roboto",
      backgroundColor: "#fff",
      fontSize: theme.fontSize.xs,
      paddingTop: 40,
      paddingRight: 80,
      paddingBottom: 40,
      paddingLeft: 80,
    },
    initials: {
      position: "absolute",
      color: "#000",
      textTransform: "uppercase",
      backgroundColor: "#43f398",
      fontWeight: 400,
      left: 20,
      top: 20,
      paddingTop: 5,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 5,
    },
    header: {
      marginBottom: 16,
    },
    name: {
      fontSize: theme.fontSize["2xl"],
      marginBottom: 20,
      textTransform: "uppercase",
      fontWeight: 700,
    },
    title: {
      marginBottom: 10,
    },
    details: {
      color: "#707678",
      marginBottom: 10,
    },
    summary: {
      lineHeight: 1.4,
      color: "#707678",
    },
    sectionLabel: {
      color: "#707678",
      textTransform: "uppercase",
      marginBottom: 10,
      letterSpacing: 1,
      fontWeight: 700,
    },
    sectionItem: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 16,
    },
    sectionTitle: {
      textTransform: "uppercase",
      fontSize: theme.fontSize.sm,
      letterSpacing: 0.06,
      fontWeight: 700,
      marginBottom: 8,
    },
    subtitle: {
      color: "#707678",
      marginBottom: 8,
    },
    description: {
      lineHeight: 1.4,
    },
    list: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 16,
    },
    listItem: {
      backgroundColor: "#f1f5f7",
      marginRight: 4,
      marginBottom: 4,
      paddingLeft: 12,
      paddingTop: 6,
      paddingRight: 12,
      paddingBottom: 6,
    },
  });

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
                        {item.subtitle || "subtitle"} | {item.city || "city"} |{" "}
                        {item.startDate || "start date"} -{" "}
                        {item.endDate || "end date"}
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
              <Text style={styles.sectionLabel}>
                {sectionItem.label || "label"}
              </Text>
              <View style={styles.list}>
                {sectionItem.tags?.split("\n").map((item, index) => {
                  return (
                    <Text key={index} style={styles.listItem}>
                      {item || "item"}
                    </Text>
                  );
                })}
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}

export default BerlinPdf;
