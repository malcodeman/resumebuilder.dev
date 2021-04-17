import { Text, Flex, Box } from "@chakra-ui/react";
import { FileText } from "react-feather";

function Logo() {
  return (
    <Flex alignItems="center">
      <Box marginRight="20px">
        <FileText size={20} />
      </Box>
      <Text>resumebuilder.dev</Text>
    </Flex>
  );
}

export default Logo;
