import {
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
  InputGroupProps,
} from "@chakra-ui/react";
import { SearchIcon, XIcon } from "lucide-react";

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
      <InputLeftElement>
        <Icon as={SearchIcon} size={16} />
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
          <Icon as={XIcon} size={16} cursor="pointer" onClick={onClear} />
        </InputRightElement>
      ) : null}
    </InputGroup>
  );
}

export default SearchInput;
