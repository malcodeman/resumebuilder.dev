import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
  Flex,
  Tooltip,
  FormControl,
  FormLabel,
  Switch,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Download, Link, MoreHorizontal } from "react-feather";
import { useCopyToClipboard } from "react-use";

const TOOLTIP_MORE_LABEL = "Style, export, and more...";

type props = {
  isFullWidth: boolean;
  setIsFullWidth: (nextValue: boolean) => void;
  onPdfExport: () => void;
  onJsonExport: () => void;
};

function HeaderPopover(props: props) {
  const { isFullWidth, setIsFullWidth, onPdfExport, onJsonExport } = props;
  const [{}, copyToClipboard] = useCopyToClipboard();

  return (
    <Popover>
      {({ isOpen }) => (
        <>
          <Tooltip
            label={TOOLTIP_MORE_LABEL}
            aria-label={TOOLTIP_MORE_LABEL}
            isDisabled={isOpen}
          >
            <Flex>
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  aria-label={TOOLTIP_MORE_LABEL}
                  icon={<MoreHorizontal size={20} />}
                />
              </PopoverTrigger>
            </Flex>
          </Tooltip>
          <PopoverContent width="222px">
            <PopoverBody>
              <Flex flexDirection="column">
                <FormControl
                  mb="2"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  isDisabled={true}
                >
                  <FormLabel htmlFor="is-small-text" mb="0" width="100%">
                    Small text
                  </FormLabel>
                  <Switch isDisabled={true} id="is-small-text" />
                </FormControl>
                <FormControl
                  mb="2"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormLabel
                    htmlFor="is-full-width"
                    mb="0"
                    width="100%"
                    cursor="pointer"
                  >
                    Full width
                  </FormLabel>
                  <Switch
                    isChecked={isFullWidth}
                    onChange={() => setIsFullWidth(!isFullWidth)}
                    id="is-full-width"
                  />
                </FormControl>
                <Divider marginY="2" />
                <Button
                  size="sm"
                  mb="2"
                  justifyContent="flex-start"
                  leftIcon={<Link size={20} />}
                  onClick={() => copyToClipboard(window.location.href)}
                >
                  Copy link
                </Button>
                <Divider marginY="2" />
                <Button
                  size="sm"
                  mb="2"
                  justifyContent="flex-start"
                  leftIcon={<Download size={20} />}
                  onClick={onPdfExport}
                >
                  Export PDF
                </Button>
                <Button
                  size="sm"
                  justifyContent="flex-start"
                  leftIcon={<Download size={20} />}
                  onClick={onJsonExport}
                >
                  Export JSON
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default HeaderPopover;