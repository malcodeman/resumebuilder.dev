import { and, isEmpty, split } from "ramda";

import utils from "../../lib/utils";
import theme from "../theme";

import { AboutField, Design, Fields } from "../../types";

type props = {
  design: Design;
  fields: Fields;
};

function LondonReact(props: props) {
  const { design, fields } = props;
  const { about, section } = fields;
  const styles = {
    page: {
      width: "100%",
      lineHeight: 1,
      height: "100%",
      color: "#222831",
      backgroundColor: "#fff",
      overflowWrap: "break-word",
      fontFamily: `'Roboto', sans-serif`,
      paddingTop: utils.pt2px(20 * design.spacing),
      paddingLeft: utils.pt2px(40 * design.spacing),
      paddingRight: utils.pt2px(40 * design.spacing),
      paddingBottom: utils.pt2px(20 * design.spacing),
      fontSize: utils.pt2px(theme.fontSize.xs * design.spacing),
    },
    header: {
      marginBottom: utils.pt2px(40 * design.spacing),
    },
    details: {
      display: "flex",
      color: "#677180",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: utils.pt2px(20 * design.spacing),
    },
    location: {
      display: "flex",
      flexDirection: "column",
      marginRight: utils.pt2px(20 * design.spacing),
    },
    column: {
      display: "flex",
      flexDirection: "column",
    },
    name: {
      fontWeight: 700,
      marginBottom: utils.pt2px(20 * design.spacing),
      fontSize: utils.pt2px(theme.fontSize["2xl"] * design.spacing),
    },
    summary: {
      color: "#677180",
      lineHeight: 1.4,
    },
    sectionLabel: {
      fontWeight: 700,
      marginBottom: utils.pt2px(10 * design.spacing),
    },
    sectionItem: {
      display: "flex",
      flexDirection: "row",
      marginBottom: utils.pt2px(16 * design.spacing),
    },
    leftColumn: {
      width: "25%",
      color: "#586880",
      paddingRight: utils.pt2px(20 * design.spacing),
      fontSize: utils.pt2px(theme.fontSize.sm * design.spacing),
    },
    rightColumn: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
    },
    sectionTitle: {
      fontWeight: 700,
      marginBottom: utils.pt2px(10 * design.spacing),
      fontSize: utils.pt2px(theme.fontSize.sm * design.spacing),
    },
    sectionDescription: {
      lineHeight: 1.4,
      color: "#586880",
    },
    list: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
    },
    listItem: {
      color: "#fff",
      backgroundColor: "#845ec2",
      paddingTop: utils.pt2px(6 * design.spacing),
      marginRight: utils.pt2px(4 * design.spacing),
      marginBottom: utils.pt2px(4 * design.spacing),
      paddingLeft: utils.pt2px(12 * design.spacing),
      paddingRight: utils.pt2px(12 * design.spacing),
      paddingBottom: utils.pt2px(6 * design.spacing),
    },
  } as const;

  function renderLocation(about: AboutField) {
    if (and(isEmpty(about.city), isEmpty(about.country))) {
      return null;
    }
    return (
      <p>
        {about.city}, {about.country}
      </p>
    );
  }

  function renderDate(item: { startDate: string; endDate: string }) {
    if (and(isEmpty(item.startDate), isEmpty(item.endDate))) {
      return null;
    }
    return (
      <p>
        {item.startDate} - {item.endDate}
      </p>
    );
  }

  function renderTitle(item: {
    title: string;
    subtitle: string;
    website: string;
    city: string;
    startDate: string;
    endDate: string;
    description: string;
  }) {
    if (and(isEmpty(item.title), isEmpty(item.subtitle))) {
      return null;
    }
    if (isEmpty(item.website)) {
      return (
        <p style={styles.sectionTitle}>
          {item.title}, {item.subtitle}
        </p>
      );
    }
    return (
      <a style={styles.sectionTitle} href={item.website}>
        {item.title}, {item.subtitle}
      </a>
    );
  }

  return (
    <div style={styles.page} id="london">
      <div style={styles.header}>
        <div style={styles.details}>
          <div style={styles.location}>
            {renderLocation(about)}
            <p>{about.email}</p>
          </div>
          <div style={styles.column}>
            <p>{about.phone}</p>
            <a href={about.website}>{utils.getUrlHost(about.website)}</a>
          </div>
        </div>
        <p style={styles.name}>
          {about.firstName} {about.lastName}
          {isEmpty(about.title) ? null : `, ${about.title}`}
        </p>
        {split("\n", about.summary).map((item, index) => (
          <p key={index} style={styles.summary}>
            {item}
          </p>
        ))}
      </div>
      <div>
        {section.map((sectionItem, index) => {
          if (utils.isStandardSection(sectionItem.name)) {
            return (
              <div key={index}>
                <p style={styles.sectionLabel}>{sectionItem.label}</p>
                {sectionItem.nested.map((item, index) => {
                  return (
                    <div key={index} style={styles.sectionItem}>
                      <div style={styles.leftColumn}>{renderDate(item)}</div>
                      <div style={styles.rightColumn}>
                        {renderTitle(item)}
                        {split("\n", item.description).map((item, index) => (
                          <p key={index} style={styles.sectionDescription}>
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }
          return (
            <div key={index}>
              <p style={styles.sectionLabel}>{sectionItem.label}</p>
              {isEmpty(sectionItem.tags) ? null : (
                <div style={styles.sectionItem}>
                  <div style={styles.leftColumn} />
                  <div style={styles.rightColumn}>
                    <div style={styles.list}>
                      {split("\n", sectionItem.tags).map((item, index) => (
                        <p key={index} style={styles.listItem}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LondonReact;
