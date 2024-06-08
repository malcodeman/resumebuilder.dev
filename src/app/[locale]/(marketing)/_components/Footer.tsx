import {
  Flex,
  Text,
  Box,
  ButtonGroup,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { siLinkedin, siGithub } from "simple-icons";
import { SimpleIcon } from "components/misc/SimpleIcon";
import { CONSTANTS } from "lib/constants";

function Footer() {
  return (
    <Box
      as={motion.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Flex alignItems="center" justify="space-between">
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} resumebuilder.dev
        </Text>
        <ButtonGroup variant="ghost" size="sm">
          <Link href={CONSTANTS.LINKS.LINKEDIN_PAGE} isExternal>
            <IconButton
              aria-label="LinkedIn"
              icon={<SimpleIcon size={16} path={siLinkedin.path} />}
            />
          </Link>
          <Link href={CONSTANTS.LINKS.GITHUB_REPO} isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<SimpleIcon size={16} path={siGithub.path} />}
            />
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export { Footer };
