import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
};

function NewResumeModal(props: props) {
  const { isOpen, onClose, onSubmit } = props;
  const { register, handleSubmit, reset } = useForm();
  const initialRef = React.useRef();

  React.useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new resume</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Resume name</FormLabel>
              <Input
                size="sm"
                {...register("name", { required: true })}
                data-cy="resume_name_input"
                ref={initialRef}
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            onClick={handleSubmit(onSubmit)}
            data-cy="create_resume_btn"
          >
            Create resume
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewResumeModal;
