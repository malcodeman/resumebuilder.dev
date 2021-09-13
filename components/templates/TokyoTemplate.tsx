import { StyleSheet } from "@react-pdf/renderer";
import * as R from "ramda";

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

function TokyoTemplate(props: Fields) {
  const { about, section } = props;
  const tagListSection = R.filter(
    (item) => utils.isTagListSection(item.name),
    section
  );
  const standardSection = R.filter(
    (item) => utils.isStandardSection(item.name),
    section
  );

  return (
    <div style={styles.page}>
      <div style={styles.section}>
        <p style={styles.name}>
          {about.firstName} {about.lastName}
        </p>
        <p style={styles.title}>{about.title}</p>
        {about.summary.split("\n").map((item, index) => (
          <p key={index} style={styles.summary}>
            {item}
          </p>
        ))}
      </div>
      <div style={styles.main}>
        <div style={styles.columnA}>
          <div style={styles.contactInfo}>
            <p style={styles.sectionTitleText}>Contact Info</p>
            <p style={styles.text}>
              {about.city}, {about.country}
            </p>
            <p style={styles.text}>{about.email}</p>
            <p style={styles.text}>{about.phone}</p>
          </div>
          {tagListSection.map((sectionItem, index) => {
            return (
              <div key={index} style={styles.section}>
                <p style={styles.sectionTitleText}>{sectionItem.label}</p>
                {sectionItem.tags?.split("\n").map((item, index) => {
                  return (
                    <p key={index} style={styles.text}>
                      {item}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={styles.columnB}>
          {standardSection.map((sectionItem, index) => {
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
                        <p key={index} style={styles.sectionText}>
                          {item}
                        </p>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TokyoTemplate;
