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

  React.useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new resume</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              size="sm"
              placeholder="Resume name"
              {...register("name", { required: true })}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" onClick={handleSubmit(onSubmit)}>
            Create resume
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewResumeModal;
