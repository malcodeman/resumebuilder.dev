import utils from "../../lib/utils";
import theme from "../theme";

import { Design, Fields } from "../../types";

type props = {
  design: Design;
  fields: Fields;
};

function BerlinReact(props: props) {
  const { design, fields } = props;
  const { about, section } = fields;
  const styles = {
    page: {
      lineHeight: 1,
      height: "100%",
      color: "#323336",
      position: "relative",
      fontFamily: `'Roboto', sans-serif`,
      backgroundColor: "#fff",
      fontSize: utils.pt2px(theme.fontSize.xs * design.spacing),
      paddingTop: utils.pt2px(40 * design.spacing),
      paddingRight: utils.pt2px(80 * design.spacing),
      paddingBottom: utils.pt2px(40 * design.spacing),
      paddingLeft: utils.pt2px(80 * design.spacing),
    },
    initials: {
      position: "absolute",
      color: "#000",
      textTransform: "uppercase",
      backgroundColor: "#43f398",
      fontWeight: 400,
      left: utils.pt2px(20 * design.spacing),
      top: utils.pt2px(20 * design.spacing),
      paddingTop: utils.pt2px(5 * design.spacing),
      paddingLeft: utils.pt2px(8 * design.spacing),
      paddingRight: utils.pt2px(8 * design.spacing),
      paddingBottom: utils.pt2px(5 * design.spacing),
    },
    header: {
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    name: {
      fontSize: utils.pt2px(theme.fontSize["2xl"] * design.spacing),
      marginBottom: utils.pt2px(20 * design.spacing),
      textTransform: "uppercase",
      fontWeight: 700,
    },
    title: {
      marginBottom: utils.pt2px(10 * design.spacing),
    },
    details: {
      color: "#707678",
      marginBottom: utils.pt2px(10 * design.spacing),
    },
    summary: {
      lineHeight: 1.4,
      color: "#707678",
    },
    sectionLabel: {
      color: "#707678",
      textTransform: "uppercase",
      marginBottom: utils.pt2px(10 * design.spacing),
      letterSpacing: 1 * design.spacing,
      fontWeight: 700,
    },
    sectionItem: {
      display: "flex",
      flexDirection: "column",
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    sectionTitle: {
      textTransform: "uppercase",
      fontSize: utils.pt2px(theme.fontSize.sm * design.spacing),
      letterSpacing: 0.06 * design.spacing,
      fontWeight: 700,
      marginBottom: utils.pt2px(8 * design.spacing),
    },
    subtitle: {
      color: "#707678",
      marginBottom: utils.pt2px(8 * design.spacing),
    },
    description: {
      lineHeight: 1.4,
    },
    list: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    listItem: {
      backgroundColor: "#f1f5f7",
      marginRight: utils.pt2px(4 * design.spacing),
      marginBottom: utils.pt2px(4 * design.spacing),
      paddingLeft: utils.pt2px(12 * design.spacing),
      paddingTop: utils.pt2px(6 * design.spacing),
      paddingRight: utils.pt2px(12 * design.spacing),
      paddingBottom: utils.pt2px(6 * design.spacing),
    },
  } as const;

  return (
    <div style={styles.page} id="berlin">
      <div style={styles.initials}>
        <p>{about.firstName[0] || "f"}</p>
        <p>{about.lastName[0] || "l"}</p>
      </div>
      <div style={styles.header}>
        <p style={styles.name}>
          {about.firstName || "first name"} {about.lastName || "last name"}
        </p>
        <p style={styles.title}>{about.title || "title"}</p>
        <p style={styles.details}>
          {about.city || "city"}, {about.country || "country"} |{" "}
          <a href={about.website}>{utils.getUrlHost(about.website)}</a> |{" "}
          {about.email || "email"} | {about.phone || "phone"}
        </p>
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
              <p style={styles.sectionLabel}>{sectionItem.label || "label"}</p>
              {sectionItem.nested.map((item, index) => {
                return (
                  <div key={index} style={styles.sectionItem}>
                    <p style={styles.sectionTitle}>
                      {item.website ? (
                        <a href={item.website}>{item.title || "Untitled"}</a>
                      ) : (
                        item.title || "Untitled"
                      )}
                    </p>
                    <p style={styles.subtitle}>
                      {item.subtitle || "subtitle"} | {item.city || "city"} |{" "}
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
        return (
          <div key={index}>
            <p style={styles.sectionLabel}>{sectionItem.label || "label"}</p>
            <div style={styles.list}>
              {sectionItem.tags?.split("\n").map((item, index) => {
                return (
                  <p key={index} style={styles.listItem}>
                    {item || "item"}
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
