import React from "react";
import {
  Heading,
  Grid,
  Box,
  Text,
  Center,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import Poser16 from "../../illustrations/Poser16";

function Builder() {
  return (
    <Box as="section">
      <Grid templateColumns={["1fr", "1fr 1fr"]} gap="8">
        <Center>
          <Box>
            <Text
              mb="4"
              fontSize="xs"
              fontWeight="700"
              textTransform="uppercase"
            >
              Resume builder
            </Text>
            <Heading mb="4">Powerful and easy-to-use</Heading>
            <Text mb="4">
              The fastest way to build your Software Engineer resume.
            </Text>
            <UnorderedList>
              <ListItem mb="2">
                Resume spell-checking, pre-generated phrases, all-set templates
                and more.
              </ListItem>
              <ListItem>
                Provide easy reading for hiring managers with elegant resume
                formatting.
              </ListItem>
            </UnorderedList>
          </Box>
        </Center>
        <Center>
          <Box maxW="sm" width="full">
            <Poser16 />
          </Box>
        </Center>
      </Grid>
    </Box>
  );
}

export default Builder;
