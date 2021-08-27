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
  useDisclosure,
} from "@chakra-ui/react";
import { Download, Link, MoreHorizontal, Upload } from "react-feather";

import ImportDataModal from "./ImportDataModal";

import { Fields } from "../types";

type props = {
  isFullWidth: boolean;
  setIsFullWidth: (nextValue: boolean) => void;
  onPdfExport: () => void;
  onJsonExport: () => void;
  onImport: (fields: Fields) => void;
};

const TOOLTIP_MORE_LABEL = "Style, export, and more...";

function HeaderPopover(props: props) {
  const { isFullWidth, setIsFullWidth, onPdfExport, onJsonExport, onImport } =
    props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleCopyToClipboard() {
    try {
      navigator.clipboard.writeText(window.location.href);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
                    <FormLabel
                      htmlFor="is-small-text"
                      mb="0"
                      width="100%"
                      marginInlineEnd="0"
                      paddingInlineEnd="3"
                    >
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
                      marginInlineEnd="0"
                      paddingInlineEnd="3"
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
                    onClick={handleCopyToClipboard}
                  >
                    Copy link
                  </Button>
                  <Divider marginY="2" />
                  <Button
                    size="sm"
                    mb="2"
                    justifyContent="flex-start"
                    leftIcon={<Upload size={20} />}
                    onClick={onOpen}
                  >
                    Import
                  </Button>
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
      <ImportDataModal isOpen={isOpen} onClose={onClose} onImport={onImport} />
    </>
  );
}

export default HeaderPopover;
