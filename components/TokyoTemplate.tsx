import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

import { Fields } from "../types";

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
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 48,
    width: "100%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    color: "#e36e60",
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    color: "#e36e60",
    fontSize: 14,
  },
  summary: {
    color: "#e36e60",
    fontSize: 12,
  },
  main: {
    display: "flex",
    flexDirection: "row",
  },
  columnA: {
    display: "flex",
    flexDirection: "column",
    paddingRight: 36,
    width: "20%",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 36,
  },
  text: {
    fontSize: 10,
    color: "#878787",
  },
  columnB: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 36,
  },
  sectionTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  shortLine: {
    height: 2,
    width: 12,
    marginRight: 4,
    backgroundColor: "#e36e60",
  },
  longLine: {
    height: 2,
    width: 36,
    marginRight: 4,
    backgroundColor: "#e36e60",
  },
  sectionTitleText: {
    fontSize: 10,
    color: "#e36e60",
    fontWeight: "bold",
  },
  sectionItem: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 2,
  },
  sectionHeading: {
    color: "#e36e60",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    color: "#878787",
  },
});

function SectionTitle(props: {
  lineWidth?: "short" | "long";
  children: React.ReactNode;
}) {
  const { lineWidth, children } = props;
  const lineStyle = lineWidth === "long" ? styles.longLine : styles.shortLine;

  return (
    <View style={styles.sectionTitle}>
      <View style={lineStyle} />
      <Text style={styles.sectionTitleText}>{children}</Text>
    </View>
  );
}

function TokyoTemplate(props: Fields) {
  const {
    title,
    firstName,
    lastName,
    email,
    phone,
    city,
    country,
    summary,
    standardSection,
    skill,
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.column}>
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.columnA}>
            <View style={styles.contactInfo}>
              <SectionTitle>Contact Info</SectionTitle>
              <Text style={styles.text}>
                {city}, {country}
              </Text>
              <Text style={styles.text}>{email}</Text>
              <Text style={styles.text}>{phone}</Text>
            </View>
            <View style={styles.column}>
              <SectionTitle>Skills</SectionTitle>
              {skill.map((item, index: number) => {
                return (
                  <Text style={styles.text} key={index}>
                    {item.name}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={styles.columnB}>
            {standardSection.map((sectionItem) => {
              return (
                <View style={styles.section}>
                  <SectionTitle lineWidth="long">
                    {sectionItem.label}
                  </SectionTitle>
                  {sectionItem.nested.map((item, index: number) => {
                    return (
                      <View style={styles.sectionItem} key={index}>
                        <Text style={styles.sectionHeading}>{item.title}</Text>
                        <Text style={styles.text}>
                          {item.subtitle} | {item.city} | {item.startDate} -{" "}
                          {item.endDate}
                        </Text>
                        <Text style={styles.sectionText}>
                          {item.description}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default TokyoTemplate;
