import { StyleSheet } from "@react-pdf/renderer";

import utils from "../../lib/utils";

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
    flexWrap: "wrap",
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
  const { about, section } = props;

  return (
    <div style={styles.page}>
      <div style={styles.initials}>
        <p>{about.firstName[0]}</p>
        <p>{about.lastName[0]}</p>
      </div>
      <div style={styles.section}>
        <p style={styles.name}>
          {about.firstName} {about.lastName}
        </p>
        <p style={styles.title}>{about.title}</p>
        <p style={styles.text}>
          {about.city}, {about.country} | {about.email} | {about.phone}
        </p>
        {about.summary.split("\n").map((item, index) => (
          <p key={index} style={styles.text}>
            {item}
          </p>
        ))}
      </div>
      {section.map((sectionItem, index) => {
        if (utils.isStandardSection(sectionItem.name)) {
          return (
            <div key={index} style={styles.section}>
              <p style={styles.sectionTitleText}>{sectionItem.label}</p>
              {sectionItem.nested.map((item, index) => {
                return (
                  <div key={index} style={styles.sectionItem}>
                    <p style={styles.sectionHeading}>{item.title}</p>
                    <p style={styles.text}>
                      {item.subtitle} | {item.city} | {item.startDate} -{" "}
                      {item.endDate}
                    </p>
                    {item.description.split("\n").map((item, index) => (
                      <p key={index} style={styles.sectionDescription}>
                        {item}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        }
        return (
          <div key={index} style={styles.section}>
            <p style={styles.sectionTitleText}>{sectionItem.label}</p>
            <div style={styles.list}>
              {sectionItem.tags?.split("\n").map((item, index) => {
                return (
                  <p key={index} style={styles.listItem}>
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BerlinTemplate;
