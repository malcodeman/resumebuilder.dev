import {
  StatGroup,
  Stat,
  StatHelpText,
  StatNumber,
  StatGroupProps,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { map } from "ramda";

const STATS = [
  {
    number: "2021",
    textTransKey: "year_founded",
  },
  {
    number: "€0",
    textTransKey: "total_funding",
  },
  {
    number: "1",
    textTransKey: "team_members",
  },
];

function Stats(props: StatGroupProps) {
  const t = useTranslations();
  return (
    <StatGroup {...props}>
      {map(
        (item) => (
          <Stat key={item.textTransKey} textAlign="center">
            <StatNumber>{item.number}</StatNumber>
            <StatHelpText>{t(item.textTransKey)}</StatHelpText>
          </Stat>
        ),
        STATS
      )}
    </StatGroup>
  );
}

export { Stats };
