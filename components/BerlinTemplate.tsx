import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

type props = {
  title: string;
  firstName: string;
};

function BerlinTemplate(props: props) {
  const { title, firstName } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Title - {title}</Text>
        </View>
        <View style={styles.section}>
          <Text>First name - {firstName}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default BerlinTemplate;
