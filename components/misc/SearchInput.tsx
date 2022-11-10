import {
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
  InputGroupProps,
} from "@chakra-ui/react";
import { FiSearch, FiX } from "react-icons/fi";

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
      <InputLeftElement zIndex="0">
        <Icon as={FiSearch} />
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
          <Icon as={FiX} cursor="pointer" onClick={onClear} />
        </InputRightElement>
      ) : null}
    </InputGroup>
  );
}

export default SearchInput;
