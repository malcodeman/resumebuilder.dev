import React from "react";
import { render } from "@testing-library/react";
import GithubIcon from "simple-icons/icons/github";
import DribbbleIcon from "simple-icons/icons/dribbble";

import SimpleIcon from "../components/misc/SimpleIcon";

describe("SimpleIcon", () => {
  it("Renders a Github icon", () => {
    render(<SimpleIcon size={16} path={GithubIcon.path} />);
  });
  it("Renders a Dribbble icon icon", () => {
    render(<SimpleIcon size={16} path={DribbbleIcon.path} />);
  });
});
