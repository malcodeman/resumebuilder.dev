import {
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
  InputGroupProps,
} from "@chakra-ui/react";
import { Search, X } from "react-feather";

type Props = {
  value: string;
  placeholder?: string;
  onChangeValue: (nextValue: string) => void;
  onClear: () => void;
} & InputGroupProps;

function SearchInput(props: Props) {
  const { value, placeholder, onChangeValue, onClear, ...rest } = props;
  return (
    <InputGroup size="sm" {...rest}>
      <InputLeftElement pointerEvents="none">
        <Icon as={Search} />
      </InputLeftElement>
      <Input
        variant="filled"
        borderRadius="md"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChangeValue(e.target.value)}
      />
      {value ? (
        <InputRightElement>
          <Icon as={X} cursor="pointer" onClick={onClear} />
        </InputRightElement>
      ) : null}
    </InputGroup>
  );
}

export default SearchInput;
