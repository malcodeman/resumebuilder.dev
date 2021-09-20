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
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Me5Q.ttf" },
    {
      src: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlvAw.ttf",
      fontWeight: 700,
    },
  ],
});

import utils from "../../lib/utils";
import theme from "../theme";

import { Fields } from "../../types";

function TokyoPdf(props: Fields) {
  const { about, section } = props;
  const styles = StyleSheet.create({
    page: {
      lineHeight: 1,
      height: "100%",
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      paddingBottom: 20,
      color: "#323336",
      fontFamily: "Roboto",
      backgroundColor: "#fff",
      fontSize: theme.fontSize.xs,
    },
    header: {
      marginBottom: 40,
      textAlign: "center",
      textTransform: "uppercase",
    },
    name: {
      fontWeight: 700,
      marginBottom: 20,
      textTransform: "uppercase",
      fontSize: theme.fontSize["2xl"],
    },
    text: {
      marginBottom: 4,
    },
    container: {
      display: "flex",
      flexDirection: "row",
    },
    leftColumn: {
      width: 200,
      paddingRight: 20,
      textAlign: "center",
    },
    rightColumn: {
      width: "100%",
    },
    profile: {
      marginBottom: 16,
    },
    sectionLabel: {
      fontWeight: 700,
      marginBottom: 10,
      textTransform: "uppercase",
      fontSize: theme.fontSize.xs,
    },
    summary: {
      lineHeight: 1.4,
    },
    sectionItem: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 16,
    },
    sectionTitle: {
      fontWeight: 700,
      marginBottom: 8,
      fontSize: theme.fontSize.sm,
    },
    date: {
      marginBottom: 8,
      color: "#707678",
    },
    description: {
      lineHeight: 1.4,
    },
    list: {
      marginBottom: 16,
    },
    listItem: {
      marginBottom: 8,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {about.firstName || "first name"} {about.lastName || "last name"}
          </Text>
          <Text>
            {about.title || "title"} {about.city || "city"},{" "}
            {about.country || "country"} {about.phone || "phone"}
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <View style={styles.list}>
              <Text style={styles.sectionLabel}>Details</Text>
              <Text style={styles.text}>{about.city || "city"} </Text>
              <Text style={styles.text}>{about.country || "country"}</Text>
              <Text style={styles.text}>{about.phone || "phone"}</Text>
              <Text style={styles.text}>{about.email || "email"}</Text>
            </View>
            {section.map((sectionItem, index) => {
              if (utils.isTagListSection(sectionItem.name)) {
                return (
                  <View key={index} style={styles.list}>
                    <Text style={styles.sectionLabel}>
                      {sectionItem.label || "label"}
                    </Text>
                    {sectionItem.tags?.split("\n").map((item, index) => {
                      return (
                        <Text key={index} style={styles.listItem}>
                          {item || "item"}
                        </Text>
                      );
                    })}
                  </View>
                );
              }
            })}
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.profile}>
              <Text style={styles.sectionLabel}>Profile</Text>
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
                            {item.subtitle || "subtitle"}
                            {sectionItem.name === "employmentSection"
                              ? " at "
                              : ", "}
                            {item.website ? (
                              <Link src={item.website}>
                                {item.title || "Untitled"}
                              </Link>
                            ) : (
                              item.title || "Untitled"
                            )}
                            , {item.city || "city"}
                          </Text>
                          <Text style={styles.date}>
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
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default TokyoPdf;
