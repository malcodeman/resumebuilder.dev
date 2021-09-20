import utils from "../../lib/utils";
import theme from "../theme";

import { Fields } from "../../types";

function TokyoReact(props: Fields) {
  const { about, section } = props;
  const styles = {
    page: {
      lineHeight: 1,
      height: "100%",
      paddingTop: utils.pt2px(20),
      paddingLeft: utils.pt2px(40),
      paddingRight: utils.pt2px(40),
      paddingBottom: utils.pt2px(20),
      color: "#323336",
      fontFamily: `'Roboto', sans-serif`,
      backgroundColor: "#fff",
      fontSize: utils.pt2px(theme.fontSize.xs),
    },
    header: {
      marginBottom: utils.pt2px(40),
      textAlign: "center",
      textTransform: "uppercase",
    },
    name: {
      fontWeight: 700,
      marginBottom: utils.pt2px(20),
      textTransform: "uppercase",
      fontSize: utils.pt2px(theme.fontSize["2xl"]),
    },
    text: {
      marginBottom: utils.pt2px(4),
    },
    container: {
      display: "flex",
      flexDirection: "row",
    },
    leftColumn: {
      width: utils.pt2px(200),
      paddingRight: utils.pt2px(20),
      textAlign: "center",
    },
    rightColumn: {
      width: "100%",
    },
    profile: {
      marginBottom: utils.pt2px(16),
    },
    sectionLabel: {
      fontWeight: 700,
      marginBottom: utils.pt2px(10),
      textTransform: "uppercase",
      fontSize: utils.pt2px(theme.fontSize.xs),
    },
    summary: {
      lineHeight: 1.4,
    },
    sectionItem: {
      display: "flex",
      flexDirection: "column",
      marginBottom: utils.pt2px(16),
    },
    sectionTitle: {
      fontWeight: 700,
      marginBottom: utils.pt2px(8),
      fontSize: utils.pt2px(theme.fontSize.sm),
    },
    date: {
      marginBottom: utils.pt2px(8),
      color: "#707678",
    },
    description: {
      lineHeight: 1.4,
    },
    list: {
      marginBottom: utils.pt2px(16),
    },
    listItem: {
      marginBottom: utils.pt2px(8),
    },
  } as const;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <p style={styles.name}>
          {about.firstName || "first name"} {about.lastName || "last name"}
        </p>
        <p>
          {about.title || "title"} {about.city || "city"},{" "}
          {about.country || "country"} {about.phone || "phone"}
        </p>
      </div>
      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <div style={styles.list}>
            <p style={styles.sectionLabel}>Details</p>
            <p style={styles.text}>{about.city || "city"} </p>
            <p style={styles.text}>{about.country || "country"}</p>
            <p style={styles.text}>{about.phone || "phone"}</p>
            <p style={styles.text}>{about.email || "email"}</p>
          </div>
          {section.map((sectionItem, index) => {
            if (utils.isTagListSection(sectionItem.name)) {
              return (
                <div key={index} style={styles.list}>
                  <p style={styles.sectionLabel}>
                    {sectionItem.label || "label"}
                  </p>
                  {sectionItem.tags?.split("\n").map((item, index) => {
                    return (
                      <p key={index} style={styles.listItem}>
                        {item || "item"}
                      </p>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
        <div style={styles.rightColumn}>
          <div style={styles.profile}>
            <p style={styles.sectionLabel}>Profile</p>
            {about.summary.split("\n").map((item, index) => (
              <p key={index} style={styles.summary}>
                {item || "summary"}
              </p>
            ))}
          </div>
          {section.map((sectionItem, index) => {
            if (utils.isStandardSection(sectionItem.name)) {
              return (
                <div key={index}>
                  <p style={styles.sectionLabel}>
                    {sectionItem.label || "label"}
                  </p>
                  {sectionItem.nested.map((item, index) => {
                    return (
                      <div key={index} style={styles.sectionItem}>
                        <p style={styles.sectionTitle}>
                          {item.subtitle || "subtitle"}
                          {sectionItem.name === "employmentSection"
                            ? " at "
                            : ", "}
                          {item.website ? (
                            <a href={item.website}>
                              {item.title || "Untitled"}
                            </a>
                          ) : (
                            item.title || "Untitled"
                          )}
                          , {item.city || "city"}
                        </p>
                        <p style={styles.date}>
                          {item.startDate || "start date"} -{" "}
                          {item.endDate || "end date"}
                        </p>
                        {item.description.split("\n").map((item, index) => (
                          <p key={index} style={styles.description}>
                            {item}
                          </p>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default TokyoReact;
