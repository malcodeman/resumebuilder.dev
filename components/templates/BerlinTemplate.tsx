import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

import { Fields } from "../../types";

const styles = StyleSheet.create({
  page: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    paddingTop: 30,
    paddingRight: 60,
    paddingBottom: 30,
    paddingLeft: 60,
    backgroundColor: "#ffffff",
    height: "100%",
  },
  initials: {
    position: "absolute",
    top: 15,
    left: 15,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#43f398",
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "uppercase",
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    color: "#000",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 8,
  },
  name: {
    color: "#323336",
    fontSize: 21,
    marginBottom: 2,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  title: {
    color: "#323336",
    fontSize: 12,
    marginBottom: 1,
  },
  text: {
    color: "#707678",
    fontSize: 10,
    marginBottom: 1,
  },
  sectionTitleText: {
    fontSize: 10,
    color: "#707678",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  sectionItem: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 2,
  },
  sectionHeading: {
    color: "#323336",
    textTransform: "uppercase",
    fontSize: 16,
    letterSpacing: 0.06,
  },
  sectionDescription: {
    fontSize: 10,
    color: "#323336",
  },
  list: {
    display: "flex",
    flexDirection: "row",
  },
  listItem: {
    color: "#323336",
    fontSize: 10,
    backgroundColor: "#f1f5f7",
    marginRight: 2,
    marginBottom: 2,
    padding: 4,
  },
});

function BerlinTemplate(props: Fields) {
  const {
    title,
    firstName,
    lastName,
    email,
    phone,
    city,
    country,
    summary,
    section,
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.initials}>
          <Text>{firstName[0]}</Text>
          <Text>{lastName[0]}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>
            {city}, {country} | {email} | {phone}
          </Text>
          {summary.split("\n").map((item, index) => (
            <Text key={index} style={styles.text}>
              {item}
            </Text>
          ))}
        </View>
        {section.map((sectionItem, index) => {
          if (sectionItem.name === "standardSection") {
            return (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitleText}>{sectionItem.label}</Text>
                {sectionItem.nested.map((item, index) => {
                  return (
                    <View key={index} style={styles.sectionItem}>
                      <Text style={styles.sectionHeading}>{item.title}</Text>
                      <Text style={styles.text}>
                        {item.subtitle} | {item.city} | {item.startDate} -{" "}
                        {item.endDate}
                      </Text>
                      {item.description.split("\n").map((item, index) => (
                        <Text key={index} style={styles.sectionDescription}>
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
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitleText}>{sectionItem.label}</Text>
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

export default BerlinTemplate;
