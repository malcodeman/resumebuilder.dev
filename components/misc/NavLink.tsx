import { useRouter } from "next/router";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

type props = {
  href: string;
  children: React.ReactNode;
};

function NavLink(props: props) {
  const { href, children } = props;
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <Link color={isActive ? "blue.400" : "inherit"}>{children}</Link>
    </NextLink>
  );
}

export default NavLink;
