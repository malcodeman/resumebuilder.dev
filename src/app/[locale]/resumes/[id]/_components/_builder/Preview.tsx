import {
  AspectRatio,
  Box,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useWatch, UseFormReturn } from "react-hook-form";
import getTemplate from "lib/getTemplate";
import useLocalStorage from "hooks/useLocalStorage";
import useProfilePicture from "hooks/useProfilePicture";
import { Resume } from "types";

type Props = {
  form: UseFormReturn<Resume, object>;
};

function Preview(props: Props) {
  const { form } = props;
  const [hideSensitiveData] = useLocalStorage("hide-sensitive-data");
  const [profilePicture] = useProfilePicture();
  const watch = useWatch({
    control: form.control,
    name: ["id", "design", "about", "section"],
  });
  const id = watch[0];
  const fields = {
    about: watch[2],
    section: watch[3],
  };
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );
  const spacing = useBreakpointValue(
    {
      base: 0.6,
      md: 1,
    },
    {
      fallback: "1",
    }
  );
  const document = id
    ? getTemplate({
        isPdf: false,
        hideSensitiveData,
        design: { ...watch[1], spacing },
        fields,
        profilePicture,
      })
    : null;
  return (
    <AspectRatio ratio={1.618 / 2}>
      <Box userSelect="none" boxShadow={boxShadow}>
        {document}
      </Box>
    </AspectRatio>
  );
}

export default Preview;
