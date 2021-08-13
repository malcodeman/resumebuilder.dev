import { Text, Flex, Box } from "@chakra-ui/react";
import { FileText } from "react-feather";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" passHref>
      <Flex alignItems="center" _hover={{ cursor: "pointer" }}>
        <Box marginRight="20px">
          <FileText size={20} />
        </Box>
        <Text>resumebuilder.dev</Text>
      </Flex>
    </Link>
  );
}

export default Logo;
