import { Heading, Grid, Box, Text, Center } from "@chakra-ui/react";
import { map } from "ramda";
import { FiLock, FiGift, FiFastForward } from "react-icons/fi";

const FEATURES = [
  {
    title: "Privacy first",
    text: "Own and manage your own database.",
    icon: <FiLock size={48} color="#f82b60" />,
  },
  {
    title: "Free forever",
    text: "Anyone can build resumes.",
    icon: <FiGift size={48} color="#ff6f2c" />,
  },
  {
    title: "Fast",
    text: "Statically-rendered pages.",
    icon: <FiFastForward size={48} color="#fcb400" />,
  },
];

function Features() {
  return (
    <Box as="section">
      <Center mb="16">
        <Heading>Privacy-focused and login-free.</Heading>
      </Center>
      <Grid templateColumns={["1fr", "1fr 1fr 1fr"]} gap="8">
        {map(
          (item) => (
            <Center key={item.title} flexDirection="column">
              {item.icon}
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
