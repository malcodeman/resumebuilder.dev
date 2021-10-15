import { Heading, Grid, Box, Text, Center } from "@chakra-ui/react";
import { Emoji } from "emoji-mart";
import * as R from "ramda";

const FEATURES = [
  {
    title: "Privacy first",
    text: "Own and manage your own database.",
    emoji: <Emoji emoji="lock" size={48} />,
  },
  {
    title: "Free forever",
    text: "Anyone can build resumes.",
    emoji: <Emoji emoji="money_with_wings" size={48} />,
  },
  {
    title: "Fast",
    text: "Statically-rendered pages.",
    emoji: <Emoji emoji="rocket" size={48} />,
  },
];

function Features() {
  return (
    <Box as="section">
      <Center mb="16">
        <Heading>Privacy-focused and login-free.</Heading>
      </Center>
      <Grid templateColumns={["1fr", "1fr 1fr 1fr"]} gap="8">
        {R.map(
          (item) => (
            <Center key={item.title} flexDirection="column">
              {item.emoji}
              <Heading mb="4">{item.title}</Heading>
              <Text>{item.text}</Text>
            </Center>
          ),
          FEATURES
        )}
      </Grid>
    </Box>
  );
}

export default Features;
