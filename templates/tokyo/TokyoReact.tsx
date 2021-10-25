import * as R from "ramda";

import utils from "../../lib/utils";
import theme from "../theme";

import { Design, Fields } from "../../types";

type props = {
  design: Design;
  fields: Fields;
};

function TokyoReact(props: props) {
  const { design, fields } = props;
  const { about, section } = fields;
  const styles = {
    page: {
      lineHeight: 1,
      height: "100%",
      paddingTop: utils.pt2px(20 * design.spacing),
      paddingLeft: utils.pt2px(40 * design.spacing),
      paddingRight: utils.pt2px(40 * design.spacing),
      paddingBottom: utils.pt2px(20 * design.spacing),
      color: "#323336",
      fontFamily: `'Roboto', sans-serif`,
      backgroundColor: "#fff",
      fontSize: utils.pt2px(theme.fontSize.xs * design.spacing),
      overflowWrap: "break-word",
    },
    header: {
      marginBottom: utils.pt2px(40 * design.spacing),
      textAlign: "center",
      textTransform: "uppercase",
    },
    name: {
      fontWeight: 700,
      marginBottom: utils.pt2px(20 * design.spacing),
      textTransform: "uppercase",
      fontSize: utils.pt2px(theme.fontSize["2xl"] * design.spacing),
    },
    text: {
      marginBottom: utils.pt2px(4 * design.spacing),
    },
    container: {
      display: "flex",
      flexDirection: "row",
    },
    leftColumn: {
      width: "25%",
      textAlign: "center",
      paddingRight: utils.pt2px(20 * design.spacing),
    },
    rightColumn: {
      width: "75%",
    },
    profile: {
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    sectionLabel: {
      fontWeight: 700,
      marginBottom: utils.pt2px(10 * design.spacing),
      textTransform: "uppercase",
    },
    summary: {
      lineHeight: 1.4,
    },
    sectionItem: {
      display: "flex",
      flexDirection: "column",
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    sectionTitle: {
      fontWeight: 700,
      marginBottom: utils.pt2px(8 * design.spacing),
      fontSize: utils.pt2px(theme.fontSize.sm * design.spacing),
    },
    date: {
      marginBottom: utils.pt2px(8 * design.spacing),
      color: "#707678",
    },
    description: {
      lineHeight: 1.4,
    },
    list: {
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    listItem: {
      marginBottom: utils.pt2px(8 * design.spacing),
    },
  } as const;

  function renderDate(item: { startDate: string; endDate: string }) {
    if (R.and(R.isEmpty(item.startDate), R.isEmpty(item.endDate))) {
      return null;
    }
    return (
      <p style={styles.date}>
        {item.startDate} - {item.endDate}
      </p>
    );
  }

  return (
    <div style={styles.page} id="tokyo">
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
            <a style={styles.text} href={about.website}>
              {utils.getUrlHost(about.website)}
            </a>
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
                        {renderDate(item)}
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
