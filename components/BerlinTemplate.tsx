import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 30,
    paddingRight: 20,
    paddingBottom: 30,
    paddingLeft: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 16,
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
  secondaryText: {
    color: "#707678",
    fontSize: 10,
    marginBottom: 1,
  },
  section: {},
  sectionItem: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 10,
    color: "#707678",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  sectionDescription: {
    fontSize: 10,
    color: "#323336",
  },
  companyName: {
    color: "#323336",
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 0.06,
  },
});

type props = {
  [x: string]: any;
};

function BerlinTemplate(props: props) {
  const {
    title,
    firstName,
    lastName,
    email,
    phone,
    summary,
    employment,
    education,
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.secondaryText}>
            {email} | {phone}
          </Text>
          <Text style={styles.secondaryText}>{summary}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {employment.map((item, index: number) => {
            return (
              <View style={styles.sectionItem} key={index}>
                <Text style={styles.companyName}>{item.companyName}</Text>
                <Text style={styles.secondaryText}>
                  {item.jobTitle} | {item.startDate} - {item.endDate}
                </Text>
                <Text style={styles.sectionDescription}>
                  {item.description}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((item, index: number) => {
            return (
              <View style={styles.sectionItem} key={index}>
                <Text style={styles.companyName}>{item.school}</Text>
                <Text style={styles.secondaryText}>
                  {item.degree} | {item.startDate} - {item.endDate}
                </Text>
                <Text style={styles.sectionDescription}>
                  {item.description}
                </Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

export default BerlinTemplate;
