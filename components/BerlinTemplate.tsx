import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
  skills: {
    display: "flex",
    flexDirection: "row",
  },
  skill: {
    color: "#323336",
    fontSize: 10,
    backgroundColor: "#f1f5f7",
    marginRight: 2,
    marginBottom: 2,
    padding: 4,
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
    skill,
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
            {email} | {phone}
          </Text>
          <Text style={styles.text}>{summary}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitleText}>Work Experience</Text>
          {employment.map((item, index: number) => {
            return (
              <View style={styles.sectionItem} key={index}>
                <Text style={styles.sectionHeading}>{item.companyName}</Text>
                <Text style={styles.text}>
                  {item.jobTitle} | {item.city} | {item.startDate} -{" "}
                  {item.endDate}
                </Text>
                <Text style={styles.sectionDescription}>
                  {item.description}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitleText}>Education</Text>
          {education.map((item, index: number) => {
            return (
              <View style={styles.sectionItem} key={index}>
                <Text style={styles.sectionHeading}>{item.school}</Text>
                <Text style={styles.text}>
                  {item.degree} | {item.city} | {item.startDate} -{" "}
                  {item.endDate}
                </Text>
                <Text style={styles.sectionDescription}>
                  {item.description}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitleText}>Skills</Text>
          <View style={styles.skills}>
            {skill.map((item, index: number) => {
              return (
                <Text style={styles.skill} key={index}>
                  {item.name}
                </Text>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default BerlinTemplate;
