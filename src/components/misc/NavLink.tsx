import { Link, SpaceProps } from "@chakra-ui/react";
import { equals } from "ramda";
import { Link as NextLink, usePathname } from "navigation";

type Props = {
  href: string;
  children: React.ReactNode;
} & SpaceProps;

function NavLink(props: Props) {
  const { href, children, ...rest } = props;
  const pathname = usePathname();
  const isActive = equals(pathname, href);
  return (
    <Link
      {...rest}
      as={NextLink}
      href={href}
      color={isActive ? "blue.400" : "inherit"}
    >
      {children}
    </Link>
  );
}

export { NavLink };
