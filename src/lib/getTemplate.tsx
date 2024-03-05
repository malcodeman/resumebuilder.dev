import Berlin from "templates/Berlin";
import Tokyo from "templates/Tokyo";
import London from "templates/London";
import Rio from "templates/Rio";
import Nairobi from "templates/Nairobi";
import { TemplateProps } from "types";

function getTemplate(props: TemplateProps) {
  const { design } = props;
  switch (design.template) {
    default:
    case "berlin":
      return <Berlin {...props} />;
    case "tokyo":
      return <Tokyo {...props} />;
    case "london":
      return <London {...props} />;
    case "rio":
      return <Rio {...props} />;
    case "nairobi":
      return <Nairobi {...props} />;
  }
}

export default getTemplate;
