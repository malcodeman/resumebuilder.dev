import { Flex } from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

function DraggableItem(props: Props) {
  const { children } = props;
  return (
    <Flex
      paddingInlineStart="4"
      paddingInlineEnd="4"
      paddingTop="2"
      paddingBottom="2"
      alignItems="center"
    >
      <ChevronDownIcon size={16} style={{ marginRight: "0.5rem" }} />
      {children}
    </Flex>
  );
}

export { DraggableItem };
