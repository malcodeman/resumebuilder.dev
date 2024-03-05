import { Link, SpaceProps } from "@chakra-ui/react";
import { equals } from "ramda";
import { Link as NextLink, usePathname } from "navigation";

type props = {
  href: string;
  passHref?: boolean;
  children: React.ReactNode;
} & SpaceProps;

function NavLink(props: props) {
  const { href, passHref = true, children, ...rest } = props;
  const pathname = usePathname();
  const isActive = equals(pathname, href);
  return (
    <NextLink href={href} passHref={passHref} legacyBehavior>
      <Link {...rest} color={isActive ? "blue.400" : "inherit"}>
        {children}
      </Link>
    </NextLink>
  );
}

export default NavLink;
