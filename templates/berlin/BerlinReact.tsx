import utils from "../../lib/utils";
import theme from "../theme";

import { Fields } from "../../types";

function BerlinReact(props: Fields) {
  const { about, section } = props;
  const styles = {
    page: {
      lineHeight: 1,
      height: "100%",
      color: "#323336",
      position: "relative",
      backgroundColor: "#fff",
      fontSize: utils.pt2px(theme.fontSize.md),
      paddingTop: utils.pt2px(40),
      paddingRight: utils.pt2px(80),
      paddingBottom: utils.pt2px(40),
      paddingLeft: utils.pt2px(80),
    },
    initials: {
      position: "absolute",
      color: "#000",
      textTransform: "uppercase",
      backgroundColor: "#43f398",
      fontWeight: 600,
      left: utils.pt2px(20),
      top: utils.pt2px(20),
      paddingTop: utils.pt2px(5),
      paddingLeft: utils.pt2px(8),
      paddingRight: utils.pt2px(8),
      paddingBottom: utils.pt2px(5),
    },
    section: {
      display: "flex",
      flexDirection: "column",
      marginBottom: utils.pt2px(8),
    },
    name: {
      fontSize: utils.pt2px(theme.fontSize["2xl"]),
      marginBottom: utils.pt2px(20),
      textTransform: "uppercase",
      fontWeight: 600,
    },
    title: {
      marginBottom: utils.pt2px(6),
    },
    text: {
      color: "#707678",
      marginBottom: utils.pt2px(4),
    },
    sectionLabel: {
      fontSize: utils.pt2px(theme.fontSize.xs),
      color: "#707678",
      textTransform: "uppercase",
      marginBottom: utils.pt2px(22),
      letterSpacing: 1,
    },
    sectionItem: {
      display: "flex",
      flexDirection: "column",
      marginBottom: utils.pt2px(2),
    },
    sectionTitle: {
      textTransform: "uppercase",
      fontSize: utils.pt2px(theme.fontSize.lg),
      letterSpacing: 0.06,
      fontWeight: 600,
      marginBottom: utils.pt2px(8),
    },
    list: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    listItem: {
      backgroundColor: "#f1f5f7",
      fontSize: utils.pt2px(theme.fontSize.sm),
      marginRight: utils.pt2px(4),
      marginBottom: utils.pt2px(4),
      paddingLeft: utils.pt2px(12),
      paddingTop: utils.pt2px(6),
      paddingRight: utils.pt2px(12),
      paddingBottom: utils.pt2px(6),
    },
  } as const;

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
              <p style={styles.sectionLabel}>{sectionItem.label}</p>
              {sectionItem.nested.map((item, index) => {
                return (
                  <div key={index} style={styles.sectionItem}>
                    <p style={styles.sectionTitle}>
                      {item.website ? (
                        <a href={item.website}>{item.title}</a>
                      ) : (
                        item.title
                      )}
                    </p>
                    <p style={styles.text}>
                      {item.subtitle} | {item.city} | {item.startDate} -{" "}
                      {item.endDate}
                    </p>
                    {item.description.split("\n").map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        }
        return (
          <div key={index} style={styles.section}>
            <p style={styles.sectionLabel}>{sectionItem.label}</p>
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

export default BerlinReact;
