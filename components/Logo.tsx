import { Text, Flex, Box } from "@chakra-ui/react";
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
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1"
            viewBox="0 0 48 48"
            enableBackground="new 0 0 48 48"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              fill="#90cdf4"
              points="40,45 8,45 8,3 30,3 40,13"
            ></polygon>
            <polygon fill="#1a202c" points="38.5,14 29,14 29,4.5"></polygon>
            <g fill="#1a202c">
              <rect x="16" y="21" width="17" height="2"></rect>
              <rect x="16" y="25" width="13" height="2"></rect>
              <rect x="16" y="29" width="17" height="2"></rect>
              <rect x="16" y="33" width="13" height="2"></rect>
            </g>
          </svg>
        </Box>
        <Text data-cy="resumebuilder-text">resumebuilder.dev</Text>
      </Flex>
    </Link>
  );
}

export default Logo;
