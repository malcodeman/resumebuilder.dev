import { Flex } from "@chakra-ui/react";
import { ChevronDown } from "react-feather";

type props = {
  children: React.ReactNode;
};

function DraggableItem(props: props) {
  const { children } = props;
  return (
    <Flex
      paddingInlineStart="4"
      paddingInlineEnd="4"
      paddingTop="2"
      paddingBottom="2"
      alignItems="center"
    >
      <ChevronDown size={16} style={{ marginRight: "0.5rem" }} />
      {children}
    </Flex>
  );
}

export default DraggableItem;
