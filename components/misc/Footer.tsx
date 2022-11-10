import {
  Flex,
  Text,
  Box,
  ButtonGroup,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import LinkedinIcon from "simple-icons/icons/linkedin";
import GithubIcon from "simple-icons/icons/github";

import SimpleIcon from "./SimpleIcon";

import { LINKS } from "../../lib/constants";

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
          <Link href={LINKS.LINKEDIN_PAGE} isExternal>
            <IconButton
              aria-label="LinkedIn"
              icon={<SimpleIcon size={16} path={LinkedinIcon.path} />}
            />
          </Link>
          <Link href={LINKS.GITHUB_REPO} isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<SimpleIcon size={16} path={GithubIcon.path} />}
            />
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default Footer;
