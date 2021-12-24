import { useRouter } from "next/router";
import { Link, SpaceProps } from "@chakra-ui/react";
import NextLink from "next/link";

type props = {
  href: string;
  passHref?: boolean;
  children: React.ReactNode;
} & SpaceProps;

function NavLink(props: props) {
  const { href, passHref = true, children, ...rest } = props;
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <NextLink href={href} passHref={passHref}>
      <Link {...rest} color={isActive ? "blue.400" : "inherit"}>
        {children}
      </Link>
    </NextLink>
  );
}

export default NavLink;
