import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import * as R from "ramda";

import { TEMPLATES_LIST } from "../../lib/constants";
import getTemplate from "../../lib/getTemplate";

import { Resume, Template } from "../../types";

type props = {
  isOpen: boolean;
  values: Resume;
  onClose: () => void;
  onChange: (nextTemplate: Template) => void;
};

function TemplatesModal(props: props) {
  const { isOpen, values, onClose, onChange } = props;
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.05) 0 0 0 2px",
    "rgba(255, 255, 255, 0.05) 0 0 0 2px"
  );

  function handleOnClick(template: Template) {
    onClose();
    onChange(template);
  }

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Templates</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            gap="4"
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            }}
          >
            {R.map((item) => {
              return (
                <Box
                  key={item.title}
                  height="360px"
                  borderRadius="lg"
                  overflow="hidden"
                  userSelect="none"
                  boxShadow={boxShadow}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleOnClick(item.template)}
                >
                  {getTemplate(
                    { template: item.template, spacing: 0.6 },
                    {
                      about: values.about,
                      section: values.section,
                    }
                  )}
                </Box>
              );
            }, TEMPLATES_LIST)}
          </Grid>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
export default TemplatesModal;
