import React from "react";
import { Grid, Text, Image, Box, useColorModeValue } from "@chakra-ui/react";
import { filter, includes, isEmpty, length, map, toLower } from "ramda";
import { useTranslations } from "next-intl";
import { TEMPLATES_LIST } from "lib/constants";
import { utils } from "lib/utils";
import { Template as TemplateType } from "types";
import { SearchInput } from "components/misc/SearchInput";

type Props = {
  onChangeTemplate: (_nextTemplate: TemplateType) => void;
};

function TemplatesTabPanel(props: Props) {
  const { onChangeTemplate } = props;
  const t = useTranslations();
  const [template, setTemplate] = React.useState("");
  const filteredTemplatesBySearch = filter(
    (item) => includes(toLower(template), toLower(item.title)),
    TEMPLATES_LIST
  );
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );
  return (
    <Box
      height="100%"
      overflowY="auto"
      paddingTop="2"
      paddingInlineEnd="4"
      paddingBottom="2"
      paddingInlineStart="4"
      sx={utils.getScrollbarStyle()}
    >
      <SearchInput
        mb="4"
        value={template}
        placeholder={t("search_n_templates", {
          n: length(TEMPLATES_LIST),
        })}
        onChangeValue={(nextValue) => setTemplate(nextValue)}
        onClear={() => setTemplate("")}
      />
      {isEmpty(filteredTemplatesBySearch) ? (
        <Text>{t("no_templates_found")}</Text>
      ) : null}
      <Grid gap="4" gridTemplateColumns={["1fr", "1fr 1fr"]}>
        {map(
          (item) => (
            <Box key={item.template} data-testid="template">
              <Image
                src={item.src}
                boxShadow={boxShadow}
                alt=""
                mb="2"
                cursor="pointer"
                borderRadius="md"
                onClick={() => onChangeTemplate(item.template)}
              />
              <Text fontSize="sm" textAlign="center">
                {item.title}
              </Text>
            </Box>
          ),
          filteredTemplatesBySearch
        )}
      </Grid>
    </Box>
  );
}

export { TemplatesTabPanel };
