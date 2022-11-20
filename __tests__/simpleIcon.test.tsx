import React from "react";
import { render } from "@testing-library/react";
import { siGithub, siDribbble } from "simple-icons/icons";

import SimpleIcon from "../components/misc/SimpleIcon";

describe("SimpleIcon", () => {
  it("Renders a Github icon", () => {
    render(<SimpleIcon size={16} path={siGithub.path} />);
  });
  it("Renders a Dribbble icon icon", () => {
    render(<SimpleIcon size={16} path={siDribbble.path} />);
  });
});
