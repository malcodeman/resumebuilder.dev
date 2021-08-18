import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Stack,
  Radio,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

type props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<FieldValues>;
};

const defaultValues = {
  label: "Custom section",
  name: "standardSection",
};

function AddSectionModal(props: props) {
  const { isOpen, onClose, onSubmit } = props;
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  React.useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a section</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Section label</FormLabel>
              <Input size="sm" {...register("label", { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Section type</FormLabel>
              <RadioGroup defaultValue={defaultValues.name}>
                <Stack direction="row">
                  <Radio
                    value={defaultValues.name}
                    {...register("name", { required: true })}
                  >
                    Standard
                  </Radio>
                  <Radio
                    value="tagListSection"
                    {...register("name", { required: true })}
                  >
                    Tag List
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" type="submit">
              Add section
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default AddSectionModal;
