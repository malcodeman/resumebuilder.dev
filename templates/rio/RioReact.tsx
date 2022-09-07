import { and, isEmpty, split } from "ramda";

import utils from "../../lib/utils";
import theme from "../theme";

import { Design, Fields } from "../../types";

type props = {
  design: Design;
  fields: Fields;
};

function RioReact(props: props) {
  const { design, fields } = props;
  const { about, section } = fields;
  const styles = {
    page: {
      width: "100%",
      lineHeight: 1,
      height: "100%",
      color: "#323336",
      position: "relative",
      backgroundColor: "#fff",
      fontFamily: `'Roboto', sans-serif`,
      paddingTop: utils.pt2px(20 * design.spacing),
      paddingLeft: utils.pt2px(40 * design.spacing),
      paddingRight: utils.pt2px(40 * design.spacing),
      paddingBottom: utils.pt2px(20 * design.spacing),
      fontSize: utils.pt2px(theme.fontSize.xs * design.spacing),
    },
    header: {
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    details: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    name: {
      fontSize: utils.pt2px(theme.fontSize["2xl"] * design.spacing),
    },
    summaryText: {
      lineHeight: 1.4,
    },
    sectionLabel: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1 * design.spacing,
      borderBottom: `${utils.pt2px(1)} solid #323336`,
      marginBottom: utils.pt2px(10 * design.spacing),
      paddingBottom: utils.pt2px(4 * design.spacing),
    },
    sectionItem: {
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: utils.pt2px(8 * design.spacing),
    },
    sectionTitle: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.06 * design.spacing,
      fontSize: utils.pt2px(theme.fontSize.sm * design.spacing),
    },
    description: {
      lineHeight: 1.4,
    },
    list: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    listItem: {
      marginRight: utils.pt2px(4 * design.spacing),
      marginBottom: utils.pt2px(4 * design.spacing),
    },
  } as const;

  function renderDate(item: { startDate: string; endDate: string }) {
    if (and(isEmpty(item.startDate), isEmpty(item.endDate))) {
      return null;
    }
    if (isEmpty(item.startDate)) {
      return item.endDate;
    }
    if (isEmpty(item.endDate)) {
      return item.startDate;
    }
    return `${item.startDate} - ${item.endDate}`;
  }

  return (
    <div style={styles.page} id="rio">
      <div style={styles.header}>
        <div style={styles.details}>
          <div>
            <p>{about.city}</p>
            <p>{about.country}</p>
            <p>{about.title}</p>
          </div>
          <div style={styles.name}>
            <p>
              {about.firstName} {about.lastName}
            </p>
          </div>
          <div>
            <p>{about.phone}</p>
            <p>{about.email}</p>
            <a href={about.website}>{utils.getUrlHost(about.website)}</a>
          </div>
        </div>
        {about.summary.split("\n").map((item, index) => (
          <p key={index} style={styles.summaryText}>
            {item}
          </p>
        ))}
      </div>
      {section.map((sectionItem, index) => {
        if (utils.isStandardSection(sectionItem.name)) {
          return (
            <div key={index}>
              <p style={styles.sectionLabel}>{sectionItem.label}</p>
              {sectionItem.nested.map((item, index) => {
                return (
                  <div key={index} style={styles.sectionItem}>
                    <div style={styles.sectionHeader}>
                      <p>
                        {isEmpty(item.subtitle) ? "" : item.subtitle}
                        {isEmpty(item.city) ? "" : ` | ${item.city}`}
                      </p>
                      <p style={styles.sectionTitle}>
                        {item.website ? (
                          <a href={item.website}>{item.title}</a>
                        ) : (
                          item.title
                        )}
                      </p>
                      <p>{renderDate(item)}</p>
                    </div>
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
            <p style={styles.sectionLabel}>{sectionItem.label}</p>
            <div style={styles.list}>
              {isEmpty(sectionItem.tags)
                ? null
                : split("\n", sectionItem.tags).map((item, index) => (
                    <p key={index} style={styles.listItem}>
                      {item};
                    </p>
                  ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RioReact;
