import { Page, Document } from "@react-pdf/renderer";

function renderer(nodes: any) {
  return (
    <Document>
      <Page size="A4">{nodes}</Page>
    </Document>
  );
}

export default renderer;
