import { Text, Flex, Box } from "@chakra-ui/react";
import { FileText } from "react-feather";
import Link from "next/link";

type props = {
  href: string;
};

function Logo(props: props) {
  const { href } = props;
  return (
    <Link href={href} passHref>
      <Flex alignItems="center" _hover={{ cursor: "pointer" }}>
        <Box marginRight="2">
          <FileText size={20} />
        </Box>
        <Text>resumebuilder.dev</Text>
      </Flex>
    </Link>
  );
}

export default Logo;
