import {
  StyleSheet,
  Document,
  Page,
  View,
  Text,
  Link,
} from "@react-pdf/renderer";

import utils from "../../lib/utils";

import { Fields } from "../../types";

function BerlinPdf(props: Fields) {
  const { about, section } = props;
  const styles = StyleSheet.create({
    page: {
      lineHeight: 1,
      color: "#323336",
      position: "relative",
      backgroundColor: "#fff",
      fontSize: 12,
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
      fontWeight: 600,
      left: 20,
      top: 20,
      paddingTop: 5,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 5,
    },
    section: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 8,
    },
    name: {
      fontSize: 21,
      marginBottom: 20,
      textTransform: "uppercase",
      fontWeight: 600,
    },
    title: {
      marginBottom: 6,
    },
    text: {
      color: "#707678",
      marginBottom: 4,
    },
    sectionLabel: {
      fontSize: 9,
      color: "#707678",
      textTransform: "uppercase",
      marginBottom: 22,
      letterSpacing: 1,
    },
    sectionItem: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 2,
    },
    sectionTitle: {
      textTransform: "uppercase",
      fontSize: 13.5,
      letterSpacing: 0.06,
      fontWeight: 600,
      marginBottom: 8,
    },
    list: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    listItem: {
      backgroundColor: "#f1f5f7",
      fontSize: 10.5,
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
          <Text>{about.firstName[0]}</Text>
          <Text>{about.lastName[0]}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.name}>
            {about.firstName} {about.lastName}
          </Text>
          <Text style={styles.title}>{about.title}</Text>
          <Text style={styles.text}>
            {about.city}, {about.country} | {about.email} | {about.phone}
          </Text>
          {about.summary.split("\n").map((item, index) => (
            <Text key={index} style={styles.text}>
              {item}
            </Text>
          ))}
        </View>
        {section.map((sectionItem, index) => {
          if (utils.isStandardSection(sectionItem.name)) {
            return (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionLabel}>{sectionItem.label}</Text>
                {sectionItem.nested.map((item, index) => {
                  return (
                    <View key={index} style={styles.sectionItem}>
                      <Text style={styles.sectionTitle}>
                        {item.website ? (
                          <Link src={item.website}>{item.title}</Link>
                        ) : (
                          item.title
                        )}
                      </Text>
                      <Text style={styles.text}>
                        {item.subtitle} | {item.city} | {item.startDate} -{" "}
                        {item.endDate}
                      </Text>
                      {item.description.split("\n").map((item, index) => (
                        <Text key={index}>{item}</Text>
                      ))}
                    </View>
                  );
                })}
              </View>
            );
          }
          return (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionLabel}>{sectionItem.label}</Text>
              <View style={styles.list}>
                {sectionItem.tags?.split("\n").map((item, index) => {
                  return (
                    <Text key={index} style={styles.listItem}>
                      {item}
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
